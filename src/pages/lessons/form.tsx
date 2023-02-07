import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";
import { Resource } from "services/enums";
import { Editor } from "components/Editor";

export const LessonForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  const { action, id } = useParams();
  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Name, Description and Roles")}>
        <Form.Item
          label={t("lessons.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='is_template' hidden />
        <Form.Item label={t("lessons.fields.description")} name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={t("lessons.fields.duration")} name='duration'>
          <Input />
        </Form.Item>
      </Panel>
      {action === "edit" && (
        <Panel header={usePanelHeader("Designer", "Page content")} key='2' style={{ padding: "0" }}>
          {id ? <Editor resource={Resource.LESSON} id={id} /> : null}
        </Panel>
      )}
    </CreateOrEditForm>
  );
};
