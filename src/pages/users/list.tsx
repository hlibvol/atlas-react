import {
  useTranslate,
  IResourceComponentsProps,
  useDelete,
  useNavigation,
  useList,
  CrudFilters,
  HttpError,
} from '@pankod/refine-core';

import {
  List,
  Table,
  Avatar,
  useTable,
  BooleanField,
  Card,
  Input,
  Icons,
  Form,
  DatePicker,
  Button,
  Select,
  FormProps,
  Row,
  Col,
  ShowButton,
  TextField,
  Space,
  EditButton,
  DeleteButton,
  TagField,
} from '@pankod/refine-antd';

import { IUser, IRole, IUserFilterVariables } from 'interfaces';

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { show, edit } = useNavigation();
  const t = useTranslate();

  const { tableProps, searchFormProps } = useTable<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, status, is_active } = params;

      filters.push({
        field: 'q',
        operator: 'eq',
        value: q,
      });

      filters.push({
        field: 'is_active',
        operator: 'eq',
        value: is_active,
      });

      filters.push({
        field: 'status.text',
        operator: 'eq',
        value: status,
      });

      return filters;
    },
    syncWithLocation: false,
  });

  const { data: roles, isLoading } = useList<IRole>({
    resource: 'roles',
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Card title={t('users.filter.title')}>
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>
      <Col xl={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column
              align="center"
              key="avatar"
              dataIndex={['avatar']}
              title={t('users.fields.avatar.label')}
              render={(value) => <Avatar src="user_default_img.png" />}
            />
            <Table.Column
              key="first_name"
              dataIndex="first_name"
              title={t('users.fields.first_name')}
            />
            <Table.Column
              key="last_name"
              dataIndex="last_name"
              title={t('users.fields.last_name')}
            />
            <Table.Column
              dataIndex={['role_id']}
              title={t('users.fields.role')}
              render={(value) => {
                if (isLoading) {
                  return <TextField value="Loading..." />;
                }
                return (
                  <TagField
                    color="green"
                    value={roles?.data.find((item) => item.id === value)?.name}
                  />
                );
              }}
            />
            <Table.Column
              key="email"
              dataIndex="email"
              title={t('users.fields.email')}
            />
            <Table.Column
              key="is_active"
              dataIndex="is_active"
              title={t('users.fields.is_active.label')}
              render={(value) => <BooleanField value={value} />}
            />
            <Table.Column<IUser>
              title={t('table.actions')}
              render={(_, record) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const t = useTranslate();

  return (
    <Form layout="vertical" {...props.formProps}>
      <Row gutter={[10, 0]} align="bottom">
        <Col xs={24} xl={24} md={12}>
          <Form.Item label={t('users.filter.search.label')} name="q">
            <Input
              placeholder={t('users.filter.search.placeholder')}
              prefix={<Icons.SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} xl={24} md={8}>
          <Form.Item label={t('users.filter.is_active.label')} name="isActive">
            <Select
              allowClear
              placeholder={t('users.filter.is_active.placeholder')}
              options={[
                {
                  label: t('users.filter.is_active.true'),
                  value: 'true',
                },
                {
                  label: t('users.filter.is_active.false'),
                  value: 'false',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} xl={24} md={8}>
          <Form.Item>
            <Button style={{ width: '100%' }} htmlType="submit" type="primary">
              {t('users.filter.submit')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
