import {
  useTranslate,
  IResourceComponentsProps,
  useNavigation,
  useShow,
  useDelete,
} from "@pankod/refine-core";

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
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            align="center"
            title={t("roles.fields.id")}
          />
          <Table.Column dataIndex="name" title={t("roles.fields.title")} />
          <Table.Column<IRole>
            title={t("table.actions")}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <DeleteButton hideText size="middle" recordItemId={record.id} />
                <EditButton hideText size="middle" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
