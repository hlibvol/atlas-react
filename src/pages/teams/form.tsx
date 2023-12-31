import { Space, Tag } from "antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { DrawerForm } from "components/Resource/form";
import { IProgram, ITeam, IUser } from "interfaces";
import { Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";

export const TeamForm: React.FC<IResourceComponentsProps> = () => {
  const renderFields = (team: ITeam | BaseRecord) => {
    const isExternal = !!team?.source_id;
    return [
      {
        tabKey: "2",
        field: (
          <>
            <SelectResource resource={Resource.PROGRAM} name='program_id' disabled={isExternal} />
            {!isExternal ? (
              <SelectResource
                resource={Resource.USER}
                name='user_ids'
                isMulti
                disabled={isExternal}
              />
            ) : (
              <>
                {team.users?.length && (
                  <>
                    <h4 style={{ fontWeight: "bold" }}>Associated Users</h4>
                    {team.users?.map((user: IUser) => (
                      <Tag
                        color='default'
                        style={{ fontSize: "13px", padding: "5px", margin: "5px" }}
                      >
                        {user.first_name} {user.last_name}
                      </Tag>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.TEAM} renderFields={renderFields} />;
};
