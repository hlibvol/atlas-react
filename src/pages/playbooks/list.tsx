import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";
import { List, Table } from "@pankod/refine-antd";
import {
  useTableProps,
  useTableActionProps,
  useDefaultColumns,
  usePageSize,
  defaultColumnProps,
} from "hooks/table";
import { Resource } from "services/enums";
import { IRole } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import { TagList } from "components/core";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.PLAYBOOK });
  const defaultColumns = useDefaultColumns(Resource.PLAYBOOK);
  const tableActionProps = useTableActionProps();
  const pageSize = usePageSize();

  const columns: ColumnsType<IRole> = [
    ...defaultColumns,
    {
      dataIndex: "roles",
      title: t("playbooks.fields.process-role"),
      render: (roles: IRole[]) => <TagList resource={Resource.ROLE} records={roles} />,
    },
    tableActionProps,
  ];

  return (
    <List breadcrumb={false}>
      <Table
        {...tableProps}
        {...(pageSize && { pagination: { ...tableProps.pagination, pageSize } })}
        // @ts-ignore
        columns={columns.map((item) => ({ ...item, ...defaultColumnProps }))}
      ></Table>
    </List>
  );
};
