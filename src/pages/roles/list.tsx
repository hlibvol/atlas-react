import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";

import { Resource } from "services/enums";

import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";
import { TagField, Typography } from "@pankod/refine-antd";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
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
      dataIndex: "roles.id",
      title: t("roles.fields.updated-by"),
      width: 120,
      render: (id: number, role: BaseRecord) => (
        <>
          {role.updated_by ? (
            <Typography.Text>{role.updated_by}</Typography.Text>
          ) : (
            <Typography.Text type='secondary'>No Updated</Typography.Text>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <List columns={columns} resource={Resource.ROLE} />
      <Drawer />
    </>
  );
};
