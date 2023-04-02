import { IResourceComponentsProps } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/resource/drawer";
import List from "components/resource/list";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.COURSE} />
      <Drawer />
    </>
  );
};
