import { IResourceComponentsProps, useForm, useTranslate } from "@pankod/refine-core";
import { Form, Input, useSelect, Select, Collapse, Card } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { Editor } from "components/designer/editor";
import { IRole } from "interfaces";
import { CaretRightOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";
import { Resource } from "services/enums";

export const PlayBookForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
  });
  const { Panel } = Collapse;
  const { action } = useParams();
  const isEdit = action === "edit";
  const { queryResult } = useForm();
  const source_id = queryResult?.data?.data.id;

  return (
    <CreateOrEditForm>
      <Collapse
        defaultActiveKey={["1"]}
        style={{ gap: "8px" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel key='1' header={usePanelHeader("Details", "Name, Roles and Description")}>
          <Form.Item
            label={t("playbooks.fields.title")}
            name='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={t("playbooks.fields.process-role")} name='role_ids'>
            <Select {...roleSelectProps} mode='multiple' />
          </Form.Item>
          <Form.Item label={t("playbooks.fields.description")} name='description'>
            <MDEditor data-color-mode='light' />
          </Form.Item>
        </Panel>
        {isEdit && (
          <Panel
            header={usePanelHeader("Designer", "Page content")}
            key='2'
            style={{ padding: "0" }}
          >
            {source_id ? <Editor resource={Resource.PLAYBOOK} id={source_id} /> : null}
          </Panel>
        )}
      </Collapse>
    </CreateOrEditForm>
  );
};
