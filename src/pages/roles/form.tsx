import { IResourceComponentsProps } from "@pankod/refine-core";
import { Collapse } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import { useDefaultFormItems } from "hooks/table";
import { Resource } from "services/enums";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const { Panel } = Collapse;
  const defaultFormItems = useDefaultFormItems(Resource.ROLE);
  return (
    <CreateOrEditForm>
      <Panel key='1' header={usePanelHeader("Details", "Name")}>
        {defaultFormItems}
      </Panel>
    </CreateOrEditForm>
  );
};
