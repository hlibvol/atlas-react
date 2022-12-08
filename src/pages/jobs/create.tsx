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
  Checkbox,
} from "@pankod/refine-antd";

import InputMask from "react-input-mask";

const { Text } = Typography;

import { IAppUrl, IJob, IRole } from "interfaces";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

export const JobCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IJob>();

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

  const onChange = (e: CheckboxChangeEvent) => {};

  return (
    <Create isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout='vertical'
        initialValues={{
          isActive: true,
        }}
      >
        <Row gutter={20} wrap>
          <Col xs={24} lg={12}>
            <Form.Item
              label={t("jobs.fields.title")}
              name='name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder='Enter Name' />
            </Form.Item>
            <Form.Item label={t("jobs.fields.discription")} name='description'>
              <Input.TextArea placeholder='Enter Description' />
            </Form.Item>

            <Form.Item
              label={t("jobs.fields.application-url-id")}
              name='application_url_id'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...urlSelectProps} placeholder='Select Application URL' />
            </Form.Item>
            <Form.Item label={t("jobs.fields.process-role")} name='role_ids'>
              <Select {...roleSelectProps} mode='multiple' placeholder='Select Process Role' />
            </Form.Item>
            <Form.Item name='is_template' valuePropName='checked'>
              <Checkbox onChange={onChange}>
                <Text strong>{t("jobs.fields.is-template.label")}</Text>{" "}
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
