import { IResourceComponentsProps, useOne, useTranslate } from "@pankod/refine-core";

import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";

export const CostCenterForm: React.FC<IResourceComponentsProps> = () => {
  return <DrawerForm resource={Resource.COST_CENTER} />;
};
