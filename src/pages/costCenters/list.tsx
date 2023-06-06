import { useTranslate, IResourceComponentsProps } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { TagField } from "@refinedev/antd";
import { Typography } from "antd";

export const CostCenterList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["source_id"],
      title: t("cost-centers.fields.source"),
      render: (sourceId: number | undefined) => (
        <TagField
          color={sourceId ? "cyan" : "green"}
          value={sourceId ? t("status.external") : t("status.internal")}
        />
      ),
    },
    {
      dataIndex: "updated_by",
      title: t("cost-centers.fields.updated-by"),
      width: 120,
      render: (updatedBy: number) =>
        updatedBy ? <Typography.Text>{updatedBy}</Typography.Text> : "",
    },
  ];
  return <List columns={columns} resource={Resource.COST_CENTER} />;
};
