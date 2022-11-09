import { IResourceComponentsProps, useTranslate } from '@pankod/refine-core';

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
} from '@pankod/refine-antd';

import InputMask from 'react-input-mask';

const { Text } = Typography;

import { IUseCase, IRole, IJob } from 'interfaces';

export const UseCaseCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm<IUseCase>();

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: 'roles',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: 'jobs',
    optionLabel: 'name',
    optionValue: 'id',
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
        <Row gutter={20} wrap>
          <Col xs={24} lg={12}>
            <Form.Item
              label={t('use-cases.fields.title')}
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
              label={t('use-cases.fields.use-case-role')}
              name="role_ids"
            >
              <Select
                {...roleSelectProps}
                mode="multiple"
                placeholder="Select UseCase Role"
              />
            </Form.Item>
            <Form.Item
              label={t('use-cases.fields.use-case-job')}
              name="job_ids"
            >
              <Select
                {...jobSelectProps}
                mode="multiple"
                placeholder="Select UseCase Jobs"
              />
            </Form.Item>
            <Form.Item
              label={t('use-cases.fields.description')}
              name="description"
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
