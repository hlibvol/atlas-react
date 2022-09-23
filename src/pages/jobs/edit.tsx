import { IResourceComponentsProps, useTranslate } from '@pankod/refine-core';

import {
  Edit,
  Form,
  Input,
  useForm,
  Row,
  Col,
  Typography,
  useSelect,
  Select,
} from '@pankod/refine-antd';

const { Text } = Typography;

import { IAppUrl, IJobs } from 'interfaces';

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IJobs>();

  const { selectProps: urlSelectProps } = useSelect<IAppUrl>({
    resource: 'application-urls',
    optionLabel: 'name',
    optionValue: 'id',
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
              label={t('jobs.fields.title')}
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
              label={t('jobs.fields.application-url-id')}
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
    </Edit>
  );
};
