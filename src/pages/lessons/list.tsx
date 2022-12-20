import { useTranslate, IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { List, Table, UrlField } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { ILesson } from "interfaces";

export const LessonList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { showUrl } = useNavigation();
  const tableProps = useTableProps({ resource: Resource.LESSON });
  const tableActionProps = useTableActionProps();
  const lessonTemplates = tableProps.dataSource?.filter((item) => item.is_template === true) || [];
  return (
    <List breadcrumb={false}>
      <Table
        {...{
          ...tableProps,
          dataSource: lessonTemplates,
        }}
      >
        <Table.Column
          dataIndex='name'
          title={t("lessons.fields.title")}
          render={(name: string, lesson: ILesson) => (
            <UrlField value={showUrl(Resource.LESSON, lesson.id)}>{name}</UrlField>
          )}
        />
        <Table.Column dataIndex='description' title={t("lessons.fields.description")} />
        <Table.Column<ILesson> {...tableActionProps} />
      </Table>
    </List>
  );
};
