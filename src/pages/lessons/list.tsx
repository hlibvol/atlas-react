import { useTranslate, IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { Table, UrlField } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps, useDefaultColumns } from "hooks/table";
import { Resource } from "services/enums";
import { ILesson } from "interfaces";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";
export const LessonList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.LESSON} />
      <Drawer />
    </>
  );
};
