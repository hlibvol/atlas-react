import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, useSelect, Select, Collapse, Checkbox, Typography } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { DrawerForm } from "components/resource/form";
import { IRole, IAppUrl } from "interfaces";
import { usePanelHeader } from "hooks/common";
import { useDefaultFormItems } from "hooks/table";
import { Resource } from "services/enums";

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
  const resource = Resource.JOB;
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
        <Select {...roleSelectProps} mode='multiple' />
      </Form.Item>
      <Form.Item name='is_template' valuePropName='checked'>
        <Checkbox>
          <Text strong>{t("jobs.fields.is-template.label")}</Text>{" "}
        </Checkbox>
      </Form.Item>
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
