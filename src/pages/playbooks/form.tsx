import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Row, Col, useSelect, Select } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { IRole } from "interfaces";

export const PlayBookForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <CreateOrEditForm>
      <Row gutter={20} wrap>
        <Col xs={24} lg={12}>
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
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
    </CreateOrEditForm>
  );
};
