import {
  useTranslate,
  IResourceComponentsProps,
  useList,
  useNavigation,
  BaseRecord,
} from "@refinedev/core";
import { BooleanField, UrlField } from "@refinedev/antd";
import { Button, Tag } from "antd";
import { Resource, Action } from "services/enums";
import { ICostCenter, IRole } from "interfaces";
import List from "components/Resource/list";
import { useAppDispatch } from "redux/hooks";
import { openDrawer } from "redux/slices/drawerSlice";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { editUrl } = useNavigation();
  const { data: roles } = useList<IRole>({ resource: Resource.ROLE });
  const { data: costCenters } = useList<ICostCenter>({ resource: Resource.COST_CENTER });
  const dispatch = useAppDispatch();
  const columns = [
    {
      dataIndex: "first_name",
      title: t("users.fields.first_name"),
      render: (first_name: string, record: BaseRecord) => (
        <Button
          type='link'
          onClick={() => {
            dispatch(
              openDrawer({
                resource: Resource.USER,
                action: Action.EDIT,
                itemId: record.id,
                activeField: "first_name",
                title: record.first_name + " " + record.last_name,
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
      dataIndex: "role_id",
      title: t("users.fields.role_id"),
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
      dataIndex: "cost_center_id",
      title: t("users.fields.cost_center_id"),
      render: (costCenterId: number) => {
        const costCenter = costCenters?.data.find((item) => item.id === costCenterId);
        return (
          <Tag color='red-1'>
            {costCenter ? (
              <UrlField value={editUrl(Resource.COST_CENTER, costCenterId)}>
                {costCenter.name}
              </UrlField>
            ) : null}
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
  ];

  return <List columns={columns} resource={Resource.USER} />;
};
