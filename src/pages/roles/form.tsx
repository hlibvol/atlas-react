import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Resource } from "services/enums";
import { DrawerForm } from "components/Resource/form";
import { IRole } from "interfaces";
import { SelectResource } from "components/Resource/select";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const renderFields = (jobRole: IRole | BaseRecord) => {
    return [
      {
        tabKey: "2",
        field: (
          <>
            <SelectResource resource={Resource.JOB} name='job_ids' isMulti />
            <SelectResource resource={Resource.USE_CASE} name='use_case_ids' isMulti />
            <SelectResource resource={Resource.PLAYBOOK} name='playbook_ids' isMulti />
          </>
        ),
      },
    ];
  };

  return <DrawerForm resource={Resource.ROLE} renderFields={renderFields} />;
};
