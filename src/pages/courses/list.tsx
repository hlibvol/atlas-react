import { useTranslate, IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { TagField } from "@pankod/refine-antd";
//import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource, CourseType } from "services/enums";
import { ICourseItem } from "interfaces";
import _ from "lodash";
import Drawer from "components/resource/drawer";
import List from "components/resource/list";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const columns = [
    {
      dataIndex: ["items"],
      title: t("Lessons"),
      render: (id: number, course: BaseRecord) => {
        return (
          <TagField
            value={
              course.items.filter((item: ICourseItem) => item.item_type === CourseType.LESSON)
                .length
            }
            color='blue'
          />
        );
      },
    },
    {
      dataIndex: ["items"],
      title: t("Quizzes"),
      render: (id: number, course: BaseRecord) => {
        return (
          <TagField
            value={
              course.items.filter((item: ICourseItem) => item.item_type === CourseType.QUIZ).length
            }
            color='blue'
          />
        );
      },
    },
  ];

  return (
    <>
      <List resource={Resource.COURSE} />
      <Drawer />
    </>
  );
};
