import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Tag } from "antd";
import { DrawerForm } from "components/Resource/form";
import { SelectResource } from "components/Resource/select";
import { IPortfolio, IProgram } from "interfaces";
import { Resource } from "services/enums";

export const PortfolioForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const renderFields = (portfolio: IPortfolio | BaseRecord) => {
    const isExternal = !!portfolio?.source_id;
    return [
      {
        tabKey: "2",
        field: (
          <>
            {portfolio?.team_id && (
              <SelectResource resource={Resource.TEAM} name='team_id' disabled={isExternal} />
            )}

            {portfolio?.programs?.length && (
              <>
                <h4 style={{ fontWeight: "bold" }}>Associated Programs</h4>
                {portfolio.programs?.map((program: IProgram) => (
                  <Tag color='default' style={{ fontSize: "13px" }}>
                    {program.name}
                  </Tag>
                ))}
              </>
            )}
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.PORTFOLIO} renderFields={renderFields} />;
};
