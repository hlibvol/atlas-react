import {
  BaseRecord,
  IResourceComponentsProps,
  useTranslate,
  useGetIdentity,
} from "@refinedev/core";
import { Space, Form, Checkbox, Typography, Button, FormInstance } from "antd";
import { useSelect } from "@refinedev/antd";
import { PlayCircleOutlined, AntDesignOutlined } from "@ant-design/icons";
import { DrawerForm } from "components/Resource/form";
import { IAppUrl, IJob, IUser } from "interfaces";
import { Resource, Action } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { SelectResource } from "components/Resource/select";

export const JobForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { selectProps: urlSelectProps, queryResult: appUrls } = useSelect<IAppUrl>({
    resource: Resource.APPLICATION_URL,
    optionLabel: "name",
    optionValue: "id",
  });

  const t = useTranslate();
  const { Text } = Typography;
  const { data: user } = useGetIdentity<IUser>();
  const urlSuffix = `${user?.id}/${itemId}/${(Math.random() + 1).toString(36).substring(2)}`;

  const footer =
    itemId && action === Action.EDIT ? (
      <>
        <Space wrap>
          {user?.is_designer && (
            <Button
              type='primary'
              icon={<AntDesignOutlined rev={undefined} />}
              target='_blank'
              href={`ab:job/designer/${urlSuffix}`}
            >
              {t("buttons.design-job")}
            </Button>
          )}
          <Button
            type='primary'
            icon={<PlayCircleOutlined rev={undefined} />}
            target='_blank'
            href={`ab:job/executor/${urlSuffix}`}
          >
            {t("buttons.execute-job")}
          </Button>
        </Space>
      </>
    ) : null;

  const renderFields = (job: IJob | BaseRecord, form: FormInstance) => {
    const appTypeId = form.getFieldValue("application_type_id");
    const appUrlIds = appUrls.data?.data
      .filter((url) => url.application_type_id === appTypeId)
      .map((url) => url.id)
      .filter((id) => id !== undefined);

    const appUrlOptions =
      urlSelectProps.options?.filter((url) => appUrlIds?.includes(url.value as number)) || [];

    return [
      {
        tabKey: "1",
        field: (
          <>
            <SelectResource
              name='application_type_id'
              resource={Resource.APPLICATION_TYPE}
              onChange={() => {
                form.setFieldsValue({ application_url_id: null });
              }}
              required
            />
            <SelectResource
              resource={Resource.APPLICATION_URL}
              name='application_url_id'
              options={appUrlOptions}
              required
            />
            <Form.Item name='is_template' valuePropName='checked'>
              <Checkbox>
                <Text strong>{t("jobs.fields.is_template.label")}</Text>{" "}
              </Checkbox>
            </Form.Item>
          </>
        ),
      },
      {
        tabKey: "2",
        field: (
          <>
            <SelectResource resource={Resource.ROLE} name='role_ids' isMulti />
            <SelectResource resource={Resource.USE_CASE} name='use_case_ids' isMulti />
            <SelectResource resource={Resource.SCREEN} name='screen_ids' isMulti />
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.JOB} renderFields={renderFields} footer={footer} />;
};
