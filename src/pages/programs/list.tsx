import { useTranslate, IResourceComponentsProps, useList } from "@pankod/refine-core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { TagField, Typography } from "@pankod/refine-antd";
import { IPortfolio } from "interfaces";

export const ProgramList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: portfolios } = useList<IPortfolio>({ resource: Resource.PORTFOLIO });
  const columns = [
    {
      dataIndex: ["portfolio_id"],
      title: t("programs.fields.portfolio"),
      render: (portfolioId: number) => {
        const portfolio = portfolios?.data.find((item) => item.id === portfolioId);
        return (
          <TagField
            color={portfolio ? "#8c8c8c" : "red"}
            value={portfolio ? portfolio.name : "No Parent Portfolio"}
          />
        );
      },
    },
    {
      dataIndex: ["source_id"],
      title: t("programs.fields.source"),
      render: (sourceId: number | undefined) => (
        <TagField
          color={sourceId ? "cyan" : "green"}
          value={sourceId ? t("status.external") : t("status.internal")}
        />
      ),
    },
    {
      dataIndex: "updated_by",
      title: t("programs.fields.updated-by"),
      width: 120,
      render: (updatedBy: number) =>
        updatedBy ? <Typography.Text>{updatedBy}</Typography.Text> : "",
    },
  ];
  return <List columns={columns} resource={Resource.PROGRAM} />;
};
