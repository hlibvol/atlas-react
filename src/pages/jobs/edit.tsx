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
  Checkbox,
} from '@pankod/refine-antd';

const { Text } = Typography;

import { IAppUrl, IJob, IRole } from 'interfaces';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IJob>();

  const { selectProps: urlSelectProps } = useSelect<IAppUrl>({
    resource: 'application-urls',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: 'roles',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const onChange = (e: CheckboxChangeEvent) => {};

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
          <Col xs={24} lg={12}>
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
            <Form.Item label={t('jobs.fields.discription')} name="description">
              <Input.TextArea />
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
            <Form.Item label={t('jobs.fields.process-role')} name="role_ids">
              <Select {...roleSelectProps} mode="multiple" />
            </Form.Item>
            <Form.Item name="is_template" valuePropName="checked">
              <Checkbox onChange={onChange}>
                <Text strong>{t('jobs.fields.is-template.label')}</Text>{' '}
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
