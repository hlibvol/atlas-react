import {
  useTranslate,
  IResourceComponentsProps,
  useList,
  useNavigation,
  BaseRecord,
} from "@pankod/refine-core";
import { BooleanField, Tag, UrlField, Button, TagField, Typography } from "@pankod/refine-antd";
import { Resource, Action } from "services/enums";
import { IRole } from "interfaces";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";
import { useAppDispatch } from "redux/hooks";
import { openDrawer } from "redux/slices/drawerSlice";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { editUrl } = useNavigation();
  const { data: roles } = useList<IRole>({ resource: Resource.ROLE });
  const dispatch = useAppDispatch();
  const columns = [
    {
      dataIndex: "first_name",
      title: t("users.fields.first_name"),
      render: (id: number, record: BaseRecord) => (
        <Button
          type='link'
          onClick={() => {
            console.log(record);
            let name = record.first_name + " " + record.last_name;
            record["name"] = name;
            dispatch(
              openDrawer({
                resource: Resource.USER,
                action: Action.EDIT,
                itemId: record.id,
                activeField: "first_name",
                title: record.name,
              })
            );
          }}
        >
          {record.first_name}
        </Button>
      ),
    },
    {
      dataIndex: "last_name",
      title: t("users.fields.last_name"),
    },
    {
      dataIndex: "email",
      title: t("users.fields.email"),
    },
    {
      dataIndex: ["users.source_id"],
      title: t("users.fields.source"),
      render: (id: number, user: BaseRecord) => (
        <TagField
          color={user.source_id ? "cyan" : "green"}
          value={user.source_id ? t(`status.external`) : t(`status.internal`)}
        />
      ),
    },
    {
      dataIndex: ["role_id"],
      title: t("users.fields.role"),
      render: (roleId: number) => {
        const role = roles?.data.find((item) => item.id === roleId);
        return (
          <Tag color='green'>
            {role ? <UrlField value={editUrl(Resource.ROLE, role.id)}>{role.name}</UrlField> : null}
          </Tag>
        );
      },
    },
    {
      dataIndex: "is_designer",
      title: t("users.fields.is_designer.label"),
      render: (value: boolean) => <BooleanField value={value} />,
    },
    {
      dataIndex: "is_superuser",
      title: t("users.fields.is_superuser.label"),
      render: (value: boolean) => <BooleanField value={value} />,
    },

    {
      dataIndex: "users.id",
      title: t("users.fields.updated-by"),
      width: 120,
      render: (id: number, user: BaseRecord) => (
        <>
          {user.updated_by ? (
            <Typography.Text>{user.updated_by}</Typography.Text>
          ) : (
            <Typography.Text type='secondary'>No Updated</Typography.Text>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <List columns={columns} resource={Resource.USER} />
      <Drawer />
    </>
  );
};
