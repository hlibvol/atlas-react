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

import { IPlayBook } from "interfaces";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IPlayBook>();
  const t = useTranslate();

  return (
    <>
      <List>
        <Table {...tableProps} rowKey='id'>
          <Table.Column dataIndex='name' title={t("playbooks.fields.title")} />
          <Table.Column
            dataIndex={"roles"}
            title={t("playbooks.fields.process-role")}
            render={(value) => {
              return value.map((item: any) => {
                return <TagField color='blue' value={item.name} />;
              });
            }}
          />
          <Table.Column<IPlayBook>
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
