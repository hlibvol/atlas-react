import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import {
  Form,
  Input,
  useSelect,
  Select,
  Collapse,
  Checkbox,
  Typography,
} from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { IRole, IAppUrl } from "interfaces";
import { usePanelHeader } from "hooks/common";

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
  const { Panel } = Collapse;
  const { Text } = Typography;

  return (
    <CreateOrEditForm>
      <Panel
        key='1'
        header={usePanelHeader("Details", "Name, Description, Application URL and Roles")}
      >
        <Form.Item
          label={t("jobs.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("jobs.fields.description")} name='description'>
          <Input.TextArea />
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
          <Select {...urlSelectProps} />
        </Form.Item>
        <Form.Item label={t("jobs.fields.process-role")} name='role_ids'>
          <Select {...roleSelectProps} mode='multiple' />
        </Form.Item>
        <Form.Item name='is_template' valuePropName='checked'>
          <Checkbox>
            <Text strong>{t("jobs.fields.is-template.label")}</Text>{" "}
          </Checkbox>
        </Form.Item>
      </Panel>
    </CreateOrEditForm>
  );
};
