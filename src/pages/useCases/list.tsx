import { IResourceComponentsProps } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.USE_CASE} />
      <Drawer />
    </>
  );
};
