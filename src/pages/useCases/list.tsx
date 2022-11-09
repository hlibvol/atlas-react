import { useTranslate, IResourceComponentsProps } from '@pankod/refine-core';

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
} from '@pankod/refine-antd';

const { FormOutlined } = Icons;

import { IUseCase } from 'interfaces';

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IUseCase>();
  const t = useTranslate();

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title={t('use-cases.fields.title')} />
          <Table.Column
            dataIndex={'roles'}
            title={t('use-cases.fields.use-case-role')}
            render={(value) => {
              return value.map((item: any) => {
                return <TagField color="blue" value={item.name} />;
              });
            }}
          />
          <Table.Column
            dataIndex={'jobs'}
            title={t('use-cases.fields.use-case-job')}
            render={(value) => {
              return value.map((item: any) => {
                return <TagField color="blue" value={item.name} />;
              });
            }}
          />
          <Table.Column<IUseCase>
            title={t('table.actions')}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
