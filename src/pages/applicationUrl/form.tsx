import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Name, URL")}>
        <Form.Item
          label={t("application-urls.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("application-urls.fields.url")}
          name='url'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Panel>
    </CreateOrEditForm>
  );
};
