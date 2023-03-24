import {
  BaseRecord,
  IResourceComponentsProps,
  useTranslate,
  useGetIdentity,
  useShow,
} from "@pankod/refine-core";
import { Space, Form, useSelect, Select, Checkbox, Typography, Button } from "@pankod/refine-antd";
import { PlayCircleOutlined, AntDesignOutlined } from "@ant-design/icons";
import { DrawerForm } from "components/resource/form";
import { IRole, IAppUrl, IJob, IUseCase } from "interfaces";
import { Resource, Action } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const JobForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { selectProps: urlSelectProps } = useSelect<IAppUrl>({
    resource: "application-urls",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: useCasesSelectProps } = useSelect<IUseCase>({
    resource: "use-cases",
    optionLabel: "name",
    optionValue: "id",
  });

  const { Text } = Typography;
  const resource = Resource.JOB;
  const { action, itemId, activeField } = useAppSelector((state) => state.drawer);

  const { data: user } = useGetIdentity();

  const urlSuffix = `${user?.id}/${itemId}/${(Math.random() + 1).toString(36).substring(2)}`;
  console.log({ urlSuffix });
  const footer =
    itemId && action === Action.EDIT ? (
      <>
        <Space wrap>
          {user.is_designer && (
            <Button
              type='primary'
              size='small'
              icon={<AntDesignOutlined />}
              target='_blank'
              href={`ab:job/designer/${urlSuffix}`}
            >
              {t("buttons.design-job")}
            </Button>
          )}
          <Button
            type='primary'
            size='small'
            icon={<PlayCircleOutlined />}
            target='_blank'
            href={`ab:job/executor/${urlSuffix}`}
          >
            {t("buttons.execute-job")}
          </Button>
        </Space>
      </>
    ) : null;

  const renderFields = (jobRole: IRole | BaseRecord) => (
    <>
      <Form.Item
        label={t("jobs.fields.application-url-id")}
        name='application_url_id'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...urlSelectProps} />
      </Form.Item>
      <Form.Item label={t("jobs.fields.process-role")} name='role_ids'>
        <Select {...roleSelectProps} autoFocus={activeField === "role_ids"} mode='multiple' />
      </Form.Item>
      <Form.Item label={t("jobs.fields.associatedUseCases")} name='use_case_ids'>
        <Select
          {...useCasesSelectProps}
          autoFocus={activeField === "use_case_ids"}
          mode='multiple'
        />
      </Form.Item>
      <Form.Item name='is_template' valuePropName='checked'>
        <Checkbox>
          <Text strong>{t("jobs.fields.is-template.label")}</Text>{" "}
        </Checkbox>
      </Form.Item>
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} footer={footer} />;
};
