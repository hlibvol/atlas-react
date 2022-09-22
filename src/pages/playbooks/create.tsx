import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";

import {
  Create,
  Form,
  Input,
  useForm,
  Row,
  Col,
  Typography,
  Select,
  useSelect,
} from "@pankod/refine-antd";

import InputMask from "react-input-mask";

const { Text } = Typography;

import { IPlayBook, IRole } from "interfaces";

export const CreatePlayBook: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IPlayBook>();

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create
      isLoading={queryResult?.isFetching}
      saveButtonProps={saveButtonProps}
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={8}>
            <Form.Item
              label={t("playbooks.fields.title")}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("playbooks.fields.discription")}
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={t("playbooks.fields.process-role")} name="roles">
              <Select {...roleSelectProps} mode="multiple" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
