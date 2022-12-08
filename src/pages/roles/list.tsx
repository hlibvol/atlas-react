import {
  useTranslate,
  IResourceComponentsProps,
  useNavigation,
  useShow,
} from "@pankod/refine-core";

import {
  List,
  Table,
  useTable,
  Icons,
  useModal,
  DeleteButton,
  EditButton,
  Space,
} from "@pankod/refine-antd";

const { FormOutlined } = Icons;

import { IRole } from "interfaces";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IRole>();
  const { edit } = useNavigation();
  const { modalProps, show } = useModal();

  const t = useTranslate();

  const { queryResult, setShowId } = useShow<IRole>();

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <List>
        <Table {...tableProps} rowKey='id'>
          <Table.Column dataIndex='name' title={t("roles.fields.title")} />
          <Table.Column<IRole>
            title={t("table.actions")}
            dataIndex='actions'
            render={(_, record) => (
              <Space>
                <EditButton hideText size='middle' recordItemId={record.id} />
                <DeleteButton hideText size='middle' recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
