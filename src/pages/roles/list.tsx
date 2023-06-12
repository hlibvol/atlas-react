import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Resource } from "services/enums";

import List from "components/Resource/list";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  return <List resource={Resource.ROLE} />;
};
