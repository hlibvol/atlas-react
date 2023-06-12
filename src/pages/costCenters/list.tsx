import { useTranslate, IResourceComponentsProps } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";

export const CostCenterList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  return <List resource={Resource.COST_CENTER} />;
};
