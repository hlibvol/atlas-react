import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";
import { List, Table } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { ILesson } from "interfaces";

export const LessonList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.LESSON });
  const tableActionProps = useTableActionProps({ hideShow: true });
  const lessonTemplates = tableProps.dataSource?.filter((item) => item.is_template === true) || [];

  return (
    <List breadcrumb={false}>
      <Table
        {...{
          ...tableProps,
          dataSource: lessonTemplates,
        }}
      >
        <Table.Column dataIndex='name' title={t("lessons.fields.title")} />
        <Table.Column dataIndex='description' title={t("lessons.fields.description")} />
        <Table.Column<ILesson> {...tableActionProps} />
      </Table>
    </List>
  );
};
