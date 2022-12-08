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
  TagField,
} from '@pankod/refine-antd';

const { FormOutlined } = Icons;

import { ILesson } from 'interfaces';

export const LessonList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<ILesson>();
  const t = useTranslate();

  return (
    <>
      <List>
        <Table {...tableProps} rowKey='id'>
          <Table.Column dataIndex='name' title={t('lessons.fields.title')} />
          <Table.Column
            key='is_template'
            dataIndex='is_template'
            title={t('lessons.fields.is-template.label')}
            render={(value) =>
              value ? (
                <TagField color='green' value={t('lessons.fields.is-template.true')} />
              ) : (
                <TagField color='red' value={t('lessons.fields.is-template.false')} />
              )
            }
          />
          <Table.Column<ILesson>
            title={t('table.actions')}
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
