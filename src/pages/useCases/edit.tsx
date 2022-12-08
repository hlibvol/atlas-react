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

import { IUseCase } from 'interfaces';

export const UseCaseEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IUseCase>();

  return (
    <Edit isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout='vertical'
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
        }}
      >
        <Row gutter={20} wrap>
          <Col xs={24} lg={12}>
            <Form.Item
              label={t('use-cases.fields.title')}
              name='name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={t('use-cases.fields.description')} name='description'>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
