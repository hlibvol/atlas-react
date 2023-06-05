import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";

import List from "components/Resource/list";
import { TagField, Typography } from "@pankod/refine-antd";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: "source_id",
      title: t("roles.fields.source"),
      render: (sourceId: number | undefined) => (
        <TagField
          color={sourceId ? "cyan" : "green"}
          value={sourceId ? t("status.external") : t("status.internal")}
        />
      ),
    },
    {
      dataIndex: "updated_by",
      title: t("roles.fields.updated-by"),
      width: 120,
      render: (updatedBy: string | undefined) =>
        updatedBy ? <Typography.Text>{updatedBy}</Typography.Text> : "",
    },
  ];
  return <List columns={columns} resource={Resource.ROLE} />;
};
