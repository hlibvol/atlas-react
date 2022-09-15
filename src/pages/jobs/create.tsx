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

import { IAppUrl, IJobs } from "interfaces";

export const JobCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IJobs>();

  const { selectProps: urlSelectProps } = useSelect<IAppUrl>({
    resource: "application-urls",
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
              label={t("jobs.fields.title")}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={t("jobs.fields.discription")} name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label={t("jobs.fields.application-url-id")}
              name="application_url_id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...urlSelectProps} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
