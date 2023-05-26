import { BaseRecord, IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";

import { Resource } from "services/enums";

import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";
import { TagField, Typography } from "@pankod/refine-antd";
import { IUser } from "interfaces";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: users } = useList<IUser>({ resource: Resource.USER });
  const columns = [
    {
      dataIndex: ["roles.source_id"],
      title: t("roles.fields.source"),
      render: (id: number, role: BaseRecord) => (
        <TagField
          color={role.source_id ? "cyan" : "green"}
          value={role.source_id ? t(`status.external`) : t(`status.internal`)}
        />
      ),
    },
    {
      dataIndex: "roles.updated_by",
      title: t("roles.fields.updated-by"),
      width: 120,
      render: (updatedBy: number) => {
        const user = users?.data.find((item) => item.id === updatedBy);
        return (
          <TagField
            color={user ? "#8c8c8c" : "red"}
            value={user ? user.first_name : "No Updated"}
          />
        );
      },
    },
  ];
  return (
    <>
      <List columns={columns} resource={Resource.ROLE} />
      <Drawer />
    </>
  );
};
