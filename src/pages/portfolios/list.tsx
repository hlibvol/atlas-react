import { useTranslate, IResourceComponentsProps, useList } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { TagField } from "@refinedev/antd";
import { Typography } from "antd";
import { IPortfolio } from "interfaces";

export const PortfolioList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["source_id"],
      title: t("portfolios.fields.source_id"),
      render: (sourceId: number | undefined) => (
        <TagField
          color={sourceId ? "cyan" : "green"}
          value={sourceId ? t("status.external") : t("status.internal")}
        />
      ),
    },
    {
      dataIndex: "updated_by_user",
      title: t("portfolios.fields.updated_by_user"),
      width: 120,
      render: (updatedBy: number) =>
        updatedBy ? <Typography.Text>{updatedBy}</Typography.Text> : "",
    },
  ];
  return <List columns={columns} resource={Resource.PORTFOLIO} />;
};
