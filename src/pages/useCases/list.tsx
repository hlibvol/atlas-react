import { IResourceComponentsProps } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/resource/drawer";
import List from "components/resource/list";

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.USE_CASE} />
      <Drawer />
    </>
  );
};
