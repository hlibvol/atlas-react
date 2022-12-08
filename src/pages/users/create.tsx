import { IResourceComponentsProps, useTranslate, useApiUrl } from '@pankod/refine-core';

import {
  Form,
  Create,
  Select,
  Upload,
  Input,
  Button,
  SaveButton,
  Steps,
  getValueFromEvent,
  useStepsForm,
  useSelect,
  Typography,
  Space,
  Avatar,
  Row,
  Col,
  InputProps,
} from '@pankod/refine-antd';

import InputMask from 'react-input-mask';

const { Text } = Typography;

import { IUser, IRole } from 'interfaces';

export const UsersCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { current, gotoStep, stepsProps, formProps, saveButtonProps, queryResult } =
    useStepsForm<IUser>();
  const apiUrl = useApiUrl();

  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: 'roles',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const formList = [
    <>
      <Row gutter={20}>
        <Col xs={24} lg={8}>
          <Form.Item>
            <Form.Item
              name='avatar'
              valuePropName='fileList'
              getValueFromEvent={getValueFromEvent}
              noStyle
            >
              <Upload.Dragger
                name='file'
                action={`${apiUrl}/media/upload`}
                listType='picture'
                maxCount={1}
                multiple
                style={{
                  border: 'none',
                  width: '100%',
                  background: 'none',
                }}
              >
                <Space direction='vertical' size={2}>
                  <Avatar
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                    }}
                    src='/images/user-default-img.png'
                    alt='User Profile'
                  />
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: '16px',
                      marginTop: '8px',
                    }}
                  >
                    {t('couriers.fields.images.description')}
                  </Text>
                  <Text style={{ fontSize: '12px' }}>{t('couriers.fields.images.validation')}</Text>
                </Space>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} lg={16}>
          <Row gutter={10}>
            <Col xs={24} lg={12}>
              <Form.Item label={t('users.fields.first_name')} name='first_name'>
                <Input />
              </Form.Item>
              <Form.Item label={t('users.fields.last_name')} name='last_name'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label={t('users.fields.email')}
                name='email'
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={t('users.fields.password')}
                name='password'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type='password' placeholder='●●●●●●●●' />
              </Form.Item>
              <Form.Item
                label={t('users.fields.role')}
                name='role_id'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...roleSelectProps} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </>,
    <Row key='relations' gutter={20}>
      <Col xs={12} lg={8}>
        <Form.Item
          label={t('users.fields.is_superuser.label')}
          name='is_superuser'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: t('users.fields.is_superuser.true'),
                value: true,
              },
              {
                label: t('users.fields.is_superuser.false'),
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={12} lg={8}>
        <Form.Item
          label={t('users.fields.is_designer.label')}
          name='is_designer'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: t('users.fields.is_designer.true'),
                value: true,
              },
              {
                label: t('users.fields.is_designer.false'),
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={12} lg={8}>
        <Form.Item label={t('users.addresses.address')} name='address'>
          <Input.TextArea />
        </Form.Item>
      </Col>
    </Row>,
  ];

  return (
    <>
      <Create
        isLoading={queryResult?.isFetching}
        saveButtonProps={saveButtonProps}
        actionButtons={
          <>
            {current > 0 && (
              <Button
                onClick={() => {
                  gotoStep(current - 1);
                }}
              >
                {t('buttons.previousStep')}
              </Button>
            )}
            {current < formList.length - 1 && (
              <Button
                onClick={() => {
                  gotoStep(current + 1);
                }}
              >
                {t('buttons.nextStep')}
              </Button>
            )}
            {current === formList.length - 1 && (
              <SaveButton style={{ marginRight: 10 }} {...saveButtonProps} />
            )}
          </>
        }
      >
        <Steps {...stepsProps} responsive>
          <Steps.Step title={t('users.steps.content')} />
          <Steps.Step title={t('users.steps.addresses')} />
        </Steps>
        <Form
          {...formProps}
          style={{ marginTop: 30 }}
          layout='vertical'
          initialValues={{
            isActive: true,
          }}
        >
          {formList[current]}
        </Form>
      </Create>
    </>
  );
};
