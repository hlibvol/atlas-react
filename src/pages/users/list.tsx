import {
  useTranslate,
  IResourceComponentsProps,
  useDelete,
  useNavigation,
  useList,
} from "@pankod/refine-core";

import {
  List,
  Table,
  Avatar,
  useTable,
  Dropdown,
  Menu,
  Icons,
  Space,
  Typography,
  BooleanField,
  TextField,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@pankod/refine-antd";

import { IUser, IRole } from "interfaces";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { show, edit } = useNavigation();
  const t = useTranslate();

  const { tableProps } = useTable<IUser>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  const { data: roles, isLoading } = useList<IRole>({
    resource: "roles",
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              show("users", record.id);
            },
          };
        }}
      >
        <Table.Column
          key="name"
          title={t("users.fields.name")}
          render={(record) => (
            <Space>
              <Avatar size={74} src={record.avatar?.[0]?.url} />
              <Typography.Text>
                {record.first_name} {record.last_name}
              </Typography.Text>
            </Space>
          )}
        />

        <Table.Column
          dataIndex={["role_id"]}
          title={t("users.fields.role")}
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }
            return (
              <TextField
                value={roles?.data.find((item) => item.id === value)?.name}
              />
            );
          }}
        />

        <Table.Column dataIndex="email" title={t("users.fields.email")} />
        <Table.Column
          key="is_active"
          dataIndex="is_active"
          title={t("users.fields.is_active.label")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          key="is_designer"
          dataIndex="is_designer"
          title={t("users.fields.is_designer.label")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          key="is_superuser"
          dataIndex="is_superuser"
          title={t("users.fields.is_superuser.label")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column<IUser>
          title={t("table.actions")}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
