import { Tag } from "antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { DrawerForm } from "components/Resource/form";
import { IProgram, ITeam } from "interfaces";
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
            <SelectResource
              resource={Resource.USER}
              name='user_ids'
              isMulti
              disabled={isExternal}
            />
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.PROGRAM} renderFields={renderFields} />;
};
