import { useTranslate, IResourceComponentsProps } from '@pankod/refine-core';

import {
  List,
  Table,
  useTable,
  Icons,
  ShowButton,
  EditButton,
  Space,
  DeleteButton,
} from '@pankod/refine-antd';

const { FormOutlined } = Icons;

import { ILesson } from 'interfaces';

export const LessonList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<ILesson>();
  const t = useTranslate();

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title={t('lessons.fields.title')} />
          <Table.Column<ILesson>
            title={t('table.actions')}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
