import { IResourceComponentsProps } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.COURSE} />
      <Drawer />
    </>
  );
};
