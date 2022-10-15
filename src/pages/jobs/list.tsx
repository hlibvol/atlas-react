import {
  useTranslate,
  IResourceComponentsProps,
  useNavigation,
  useShow,
  useDelete,
  useMany,
  useList,
} from '@pankod/refine-core';

import {
  List,
  Table,
  useTable,
  DateField,
  Dropdown,
  BooleanField,
  Menu,
  Icons,
  Avatar,
  useModal,
  TextField,
  ShowButton,
  EditButton,
  Space,
  DeleteButton,
  TagField,
} from '@pankod/refine-antd';

const { FormOutlined } = Icons;

import { IAppUrl, IJob } from 'interfaces';

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IJob>();
  const t = useTranslate();

  const { data: applicationurls, isLoading } = useList<IAppUrl>({
    resource: 'application-urls',
  });

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title={t('jobs.fields.title')} />

          <Table.Column
            dataIndex={['application_url_id']}
            title={t('jobs.fields.application-url-id')}
            render={(value) => {
              if (isLoading) {
                return <TextField value="Loading..." />;
              }
              return (
                <TextField
                  value={
                    applicationurls?.data.find((item) => item.id === value)
                      ?.name
                  }
                />
              );
            }}
          />
          <Table.Column
            dataIndex={'roles'}
            title={t('jobs.fields.process-role')}
            render={(value) => {
              return value.map((item: any) => {
                return <TagField color="blue" value={item.name} />;
              });
            }}
          />
          <Table.Column
            key="is_template"
            dataIndex="is_template"
            title={t('jobs.fields.is-template.label')}
            render={(value) =>
              value ? (
                <TagField
                  color="green"
                  value={t('jobs.fields.is-template.true')}
                />
              ) : (
                <TagField
                  color="red"
                  value={t('jobs.fields.is-template.false')}
                />
              )
            }
          />
          <Table.Column<IJob>
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
