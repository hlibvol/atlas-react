import {
  BaseRecord,
  IResourceComponentsProps,
  useTranslate,
  useGetIdentity,
} from "@pankod/refine-core";
import {
  Space,
  Form,
  useSelect,
  Select,
  Checkbox,
  Typography,
  Button,
  FormInstance,
} from "@pankod/refine-antd";
import { PlayCircleOutlined, AntDesignOutlined } from "@ant-design/icons";
import { DrawerForm } from "components/Resource/form";
import { IAppUrl, IUseCase, IScreen, IAppType, IJob } from "interfaces";
import { Resource, Action } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { RoleSelect } from "components/Select";

export const JobForm: React.FC<IResourceComponentsProps> = () => {
  const { selectProps: typeSelectProps } = useSelect<IAppType>({
    resource: Resource.APPLICATION_TYPE,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: urlSelectProps, queryResult: appUrls } = useSelect<IAppUrl>({
    resource: Resource.APPLICATION_URL,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: screenSelectProps } = useSelect<IScreen>({
    resource: Resource.SCREEN,
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: useCasesSelectProps } = useSelect<IUseCase>({
    resource: Resource.USE_CASE,
    optionLabel: "name",
    optionValue: "id",
  });

  const { action, itemId, activeField } = useAppSelector((state) => state.drawer);

  const t = useTranslate();
  const { Text } = Typography;
  const { data: user } = useGetIdentity();
  const urlSuffix = `${user?.id}/${itemId}/${(Math.random() + 1).toString(36).substring(2)}`;

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

  const renderFields = (job: IJob | BaseRecord, form: FormInstance) => {
    const handleAppTypeChange = () => {
      form.setFieldsValue({ application_url_id: null });
    };

    const appTypeId = form.getFieldValue("application_type_id");
    const appUrlIds = appUrls.data?.data
      .map((url) => {
        if (url.application_type_id === appTypeId) return url.id;
      })
      .filter((id) => id !== undefined);

    const appUrlOptions =
      appUrlIds && appUrlIds.length > 0 && urlSelectProps.options
        ? urlSelectProps.options.filter((url) => appUrlIds.includes(url.value as number))
        : [];

    return (
      <>
        <RoleSelect />
        <Form.Item
          label={t("jobs.fields.application-type")}
          name='application_type_id'
          rules={[
            {
              required: true,
            },
          ]}
        >
          {
            // @ts-ignore
            <Select
              {...typeSelectProps}
              placeholder='Select Application Type'
              onChange={handleAppTypeChange}
            />
          }
        </Form.Item>
        <Form.Item
          label={t("jobs.fields.application-url-id")}
          name='application_url_id'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder='Select Application URL' options={appUrlOptions} />
        </Form.Item>
        <Form.Item label={t("jobs.fields.associatedUseCases")} name='use_case_ids'>
          <Select
            {...useCasesSelectProps}
            autoFocus={activeField === "use_case_ids"}
            placeholder='Select Use Cases'
            mode='multiple'
          />
        </Form.Item>
        <Form.Item label={t("jobs.fields.associatedScreen")} name='screen_ids'>
          <Select
            {...screenSelectProps}
            autoFocus={activeField === "screen_ids"}
            placeholder='Select Screen'
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
  };
  return <DrawerForm resource={Resource.JOB} renderFields={renderFields} footer={footer} />;
};
