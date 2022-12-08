import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  Table,
  useTable,
  TagField,
  Icons,
  ShowButton,
  EditButton,
  Space,
  DeleteButton,
} from "@pankod/refine-antd";

const { FormOutlined } = Icons;

import { ICourse } from "interfaces";

export const CourseList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<ICourse>();
  const t = useTranslate();

  return (
    <>
      <List>
        <Table {...tableProps} rowKey='id'>
          <Table.Column dataIndex='name' title={t("courses.fields.title")} />
          <Table.Column<ICourse>
            title={t("table.actions")}
            dataIndex='actions'
            render={(_, record) => (
              <Space>
                <EditButton hideText size='small' recordItemId={record.id} />
                <ShowButton hideText size='small' recordItemId={record.id} />
                <DeleteButton hideText size='small' recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
