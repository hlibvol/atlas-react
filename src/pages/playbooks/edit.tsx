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

import { IPlayBook, IRole } from 'interfaces';

export const PlayBookEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IPlayBook>();

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: 'roles',
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
        <Row gutter={20} wrap>
          <Col xs={24} lg={12}>
            <Form.Item
              label={t('playbooks.fields.title')}
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
              label={t('playbooks.fields.process-role')}
              name="role_ids"
            >
              <Select {...roleSelectProps} mode="multiple" />
            </Form.Item>
            <Form.Item
              label={t('playbooks.fields.description')}
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label={t('playbooks.fields.page-content')}
              name="page_content"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
