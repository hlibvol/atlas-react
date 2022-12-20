import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./show/container";

export const CourseForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  const { action } = useParams();
  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Title and Description")}>
        <Form.Item
          label={t("courses.fields.title")}
          name='name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("courses.fields.description")} name='description'>
          <Input.TextArea />
        </Form.Item>
      </Panel>
      {action === "edit" && (
        <Panel
          header={usePanelHeader("Course designer", "Page content")}
          key='2'
          style={{ padding: "0" }}
        >
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </Panel>
      )}
    </CreateOrEditForm>
  );
};
