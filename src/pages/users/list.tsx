import {
  useTranslate,
  IResourceComponentsProps,
  useList,
  useNavigation,
} from "@pankod/refine-core";
import { List, Table, Avatar, BooleanField, Tag, UrlField } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { IUser, IRole } from "interfaces";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { editUrl, showUrl } = useNavigation();
  const tableProps = useTableProps({ resource: Resource.USER });
  const tableActionProps = useTableActionProps();
  const { data: roles } = useList<IRole>({ resource: Resource.ROLE });

  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column
          align='center'
          key='avatar'
          dataIndex={["avatar"]}
          title={t("users.fields.avatar.label")}
          render={() => <Avatar src='user_default_img.png' />}
        />
        <Table.Column
          key='first_name'
          dataIndex='first_name'
          title={t("users.fields.first_name")}
          render={(value: string, record: IUser) => (
            <UrlField value={showUrl(Resource.USER, record.id)}>{value}</UrlField>
          )}
        />
        <Table.Column key='last_name' dataIndex='last_name' title={t("users.fields.last_name")} />
        <Table.Column
          dataIndex={["role_id"]}
          title={t("users.fields.role")}
          render={(value) => {
            const role = roles?.data.find((item) => item.id === value);
            return (
              <Tag color='green'>
                {role ? (
                  <UrlField value={editUrl(Resource.ROLE, role.id)}>{role.name}</UrlField>
                ) : null}
              </Tag>
            );
          }}
        />
        <Table.Column key='email' dataIndex='email' title={t("users.fields.email")} />
        <Table.Column
          key='is_designer'
          dataIndex='is_designer'
          title={t("users.fields.is_designer.label")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          key='is_superuser'
          dataIndex='is_superuser'
          title={t("users.fields.is_superuser.label")}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column<IUser> {...tableActionProps} />
      </Table>
    </List>
  );
};
