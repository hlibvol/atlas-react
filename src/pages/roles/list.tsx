import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Resource } from "services/enums";

import List from "components/Resource/list";
import { TagField } from "@refinedev/antd";
import { Typography } from "antd";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: "source_id",
      title: t("roles.fields.source_id"),
      render: (sourceId: number | undefined) => (
        <TagField
          color={sourceId ? "cyan" : "green"}
          value={sourceId ? t("status.external") : t("status.internal")}
        />
      ),
    },
    {
      dataIndex: "updated_by_user",
      title: t("roles.fields.updated_by_user"),
      width: 120,
      render: (updatedBy: string | undefined) =>
        updatedBy ? <Typography.Text>{updatedBy}</Typography.Text> : "",
    },
  ];
  return <List columns={columns} resource={Resource.ROLE} />;
};
