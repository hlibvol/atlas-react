import { IResourceComponentsProps, useTranslate } from '@pankod/refine-core';

import {
  Create,
  Form,
  Input,
  useForm,
  Avatar,
  Row,
  Col,
  Typography,
  Space,
  Radio,
  InputProps,
} from '@pankod/refine-antd';

import InputMask from 'react-input-mask';

const { Text } = Typography;

import { IRole } from 'interfaces';

export const RoleCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IRole>();

  return (
    <Create isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout='vertical'
        initialValues={{
          isActive: true,
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={8}>
            <Form.Item
              label={t('roles.fields.title')}
              name='name'
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
    </Create>
  );
};
