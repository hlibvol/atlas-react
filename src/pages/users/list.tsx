import {
  useTranslate,
  IResourceComponentsProps,
  useList,
  useNavigation,
} from "@pankod/refine-core";
import { List, Table, Avatar, BooleanField, Tag, UrlField } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps, usePageSize, defaultColumnProps } from "hooks/table";
import { Resource } from "services/enums";
import { IUser, IRole } from "interfaces";
import type { ColumnsType } from "antd/es/table";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { editUrl, showUrl } = useNavigation();
  const tableProps = useTableProps({ resource: Resource.USER });
  const tableActionProps = useTableActionProps();
  const pageSize = usePageSize();
  const { data: roles } = useList<IRole>({ resource: Resource.ROLE });

  const columns: ColumnsType<IUser> = [
    {
      align: "center",
      dataIndex: ["avatar"],
      title: t("users.fields.avatar.label"),
      render: () => <Avatar src='user_default_img.png' />,
    },
    {
      dataIndex: "first_name",
      title: t("users.fields.first_name"),
      render: (first_name: string, record: IUser) => (
        <UrlField value={showUrl(Resource.USER, record.id)}>{first_name}</UrlField>
      ),
    },
    {
      dataIndex: "last_name",
      title: t("users.fields.last_name"),
    },
    {
      dataIndex: ["role_id"],
      title: t("users.fields.role"),
      render: (roleId) => {
        const role = roles?.data.find((item) => item.id === roleId);
        return (
          <Tag color='green'>
            {role ? <UrlField value={editUrl(Resource.ROLE, role.id)}>{role.name}</UrlField> : null}
          </Tag>
        );
      },
    },
    {
      dataIndex: "email",
      title: t("users.fields.email"),
    },
    {
      dataIndex: "is_designer",
      title: t("users.fields.is_designer.label"),
      render: (value) => <BooleanField value={value} />,
    },
    {
      dataIndex: "is_superuser",
      title: t("users.fields.is_superuser.label"),
      render: (value) => <BooleanField value={value} />,
    },
    {
      ...tableActionProps,
    },
  ];

  return (
    <List breadcrumb={false}>
      <Table
        {...tableProps}
        {...(pageSize && { pagination: { ...tableProps.pagination, pageSize } })}
        // @ts-ignore
        columns={columns.map((item) => ({ ...item, ...defaultColumnProps }))}
      ></Table>
    </List>
  );
};
