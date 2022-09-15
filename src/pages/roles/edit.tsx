import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";

import {
  Edit,
  Form,
  Input,
  useForm,
  Row,
  Col,
  Typography,
} from "@pankod/refine-antd";

const { Text } = Typography;

import { IRole } from "interfaces";

export const RoleEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IRole>({
    metaData: { httpMethod: "PUT" },
  });

  return (
    <Edit isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={8}>
            <Form.Item
              label={t("roles.fields.title")}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
