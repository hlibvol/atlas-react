import { useTranslate, IResourceComponentsProps, useList } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { TagField } from "@refinedev/antd";
import { Typography } from "antd";
import { IPortfolio } from "interfaces";

export const ProgramList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: portfolios } = useList<IPortfolio>({ resource: Resource.PORTFOLIO });
  const columns = [
    {
      dataIndex: ["portfolio_id"],
      title: t("programs.fields.portfolio_id"),
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
  ];
  return <List columns={columns} resource={Resource.PROGRAM} />;
};
