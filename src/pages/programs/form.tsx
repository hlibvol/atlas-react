import { Tag } from "antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";

import { DrawerForm } from "components/Resource/form";
import { IProgram, ITeam } from "interfaces";
import { Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";

export const ProgramForm: React.FC<IResourceComponentsProps> = () => {
  const renderFields = (program: IProgram | BaseRecord) => {
    return [
      {
        tabKey: "2",
        field: (
          <>
            <SelectResource resource={Resource.PORTFOLIO} name='portfolio_id' />
            {program?.team_id && <SelectResource resource={Resource.TEAM} name='team_id' />}
            {program?.teams?.length && (
              <>
                <h4 style={{ fontWeight: "bold" }}>Associated Teams</h4>
                {program.teams?.map((team: ITeam) => (
                  <Tag color='default' style={{ fontSize: "13px" }}>
                    {team.name}
                  </Tag>
                ))}
              </>
            )}
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.PROGRAM} renderFields={renderFields} />;
};
