import { IResourceComponentsProps, useTranslate } from '@pankod/refine-core';

import {
  Create,
  Form,
  Input,
  useForm,
  Row,
  Col,
  Typography,
  Checkbox,
} from '@pankod/refine-antd';

const { Text } = Typography;

import { ILesson } from 'interfaces';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export const LessonCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<ILesson>();

  const onChange = (e: CheckboxChangeEvent) => {};

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
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              label={t('lessons.fields.description')}
              name="description"
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>

            <Form.Item label={t('lessons.fields.duration')} name="duration">
              <Input placeholder="Enter Duration" />
            </Form.Item>

            <Form.Item name="is_template" valuePropName="checked">
              <Checkbox onChange={onChange}>
                <Text strong>{t('lessons.fields.is-template.label')}</Text>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
