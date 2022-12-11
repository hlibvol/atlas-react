import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";
import { List, Table, TagField } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource, CourseType } from "services/enums";
import { ICourse, ICourseItem } from "interfaces";
import _ from "lodash";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.COURSE });
  const tableActionProps = useTableActionProps();
  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column dataIndex='name' title={t("courses.fields.title")} />
        <Table.Column
          dataIndex='items'
          title={"Lessons"}
          render={(items) => (
            <TagField
              value={
                items.filter((item: ICourseItem) => item.item_type === CourseType.LESSON).length
              }
              color='blue'
            />
          )}
        />
        <Table.Column
          dataIndex='items'
          title={"Quizzes"}
          render={(items) => (
            <TagField
              value={items.filter((item: ICourseItem) => item.item_type === CourseType.QUIZ).length}
              color='blue'
            />
          )}
        />
        <Table.Column<ICourse> {...tableActionProps} />
      </Table>
    </List>
  );
};
