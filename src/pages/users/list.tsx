import {
  useTranslate,
  IResourceComponentsProps,
  useDelete,
  useNavigation,
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
} from "@pankod/refine-antd";

import { IUser } from "interfaces";

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

  const { mutate: mutateDelete } = useDelete();

  const moreMenu = (id: number) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.EditOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          edit("users", id);
        }}
      >
        {t("buttons.edit")}
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        onClick={() => {
          mutateDelete({
            resource: "users",
            id,
            mutationMode: "undoable",
          });
        }}
      >
        {t("buttons.delete")}
      </Menu.Item>
    </Menu>
  );

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
        <Table.Column dataIndex="role_id" title={t("users.fields.role")} />
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
          fixed="right"
          title={t("table.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Dropdown overlay={moreMenu(record.id)} trigger={["click"]}>
              <Icons.MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 24,
                }}
              />
            </Dropdown>
          )}
        />
      </Table>
    </List>
  );
};
