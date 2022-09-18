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
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@pankod/refine-antd";

const { FormOutlined } = Icons;

import { IAppUrl } from "interfaces";

export const ApplicationURLList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IAppUrl>();
  const { edit } = useNavigation();
  const { modalProps, show } = useModal();

  const t = useTranslate();

  const { queryResult, setShowId } = useShow<IAppUrl>();

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            align="center"
            title={t("application-urls.fields.id")}
          />
          <Table.Column
            dataIndex="name"
            title={t("application-urls.fields.title")}
          />
          <Table.Column
            dataIndex="url"
            title={t("application-urls.fields.url")}
          />

          <Table.Column<IAppUrl>
            title={t("table.actions")}
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
