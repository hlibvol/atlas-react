import { IResourceComponentsProps, useTranslate } from '@pankod/refine-core';

import {
  Edit,
  Form,
  Input,
  useForm,
  Row,
  Col,
  Typography,
} from '@pankod/refine-antd';

const { Text } = Typography;

import { ILesson } from 'interfaces';

export const LessonEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<ILesson>();

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
              label={t('lessons.fields.title')}
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
              label={t('lessons.fields.description')}
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={t('lessons.fields.duration')} name="duration">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
