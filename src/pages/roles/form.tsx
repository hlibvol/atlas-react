import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import RichTextEditor from "components/RichTextEditor";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Name")}>
        <Form.Item
          label={t("roles.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("roles.fields.description")} name='description'>
          {/* @ts-ignore */}
          <RichTextEditor />
        </Form.Item>
      </Panel>
    </CreateOrEditForm>
  );
};
