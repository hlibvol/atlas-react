import { IResourceComponentsProps } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  return <List resource={Resource.USE_CASE} />;
};
