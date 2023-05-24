import { BaseRecord, IResourceComponentsProps } from "@pankod/refine-core";

import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";

export const ProgramForm: React.FC<IResourceComponentsProps> = () => {
  return <DrawerForm resource={Resource.JOB} />;
};
