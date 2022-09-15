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
} from "@pankod/refine-antd";

const { FormOutlined } = Icons;

import { IJobs } from "interfaces";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<IJobs>();
  const { edit } = useNavigation();
  const { modalProps, show } = useModal();

  const t = useTranslate();

  const { queryResult, setShowId } = useShow<IJobs>();

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  const { mutate: mutateDelete } = useDelete();

  const moreMenu = (id: number) => (
    <Menu mode="vertical">
      <Menu.Item
        key="1"
        style={{
          fontSize: 15,
          fontWeight: 500,
        }}
        icon={<FormOutlined style={{ color: "green", fontSize: "15px" }} />}
        onClick={() => edit("jobs", id)}
      >
        {t("buttons.edit")}
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        onClick={() => {
          mutateDelete({
            resource: "jobs",
            id,
            mutationMode: "undoable",
          });
        }}
      >
        {t("buttons.delete")}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            align="center"
            title={t("jobs.fields.id")}
          />
          <Table.Column dataIndex="name" title={t("jobs.fields.title")} />
          <Table.Column
            dataIndex="application_url_id"
            title={t("jobs.fields.application-url-id")}
          />
          <Table.Column
            key="application_urls.id"
            dataIndex={["application_urls", "title"]}
            title={t("jobs.fields.application-url-id")}
          />

          <Table.Column<IJobs>
            fixed="right"
            title={t("table.actions")}
            dataIndex="actions"
            key="actions"
            align="center"
            render={(_, record) => (
              <Dropdown overlay={moreMenu(record.id)} trigger={["click"]}>
                <Icons.MoreOutlined
                  style={{
                    fontSize: 24,
                  }}
                />
              </Dropdown>
            )}
          />
        </Table>
      </List>
    </>
  );
};
