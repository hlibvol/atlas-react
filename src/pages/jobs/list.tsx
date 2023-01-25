import { useTranslate, IResourceComponentsProps } from "@pankod/refine-core";
import { List, Table, TagField, UrlField } from "@pankod/refine-antd";
import {
  usePageSize,
  useTableProps,
  useTableActionProps,
  useDefaultColumns,
  defaultColumnProps,
} from "hooks/table";
import { Resource } from "services/enums";
import { IAppUrl, IRole } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import { TagList } from "components/core";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.JOB });
  const defaultColumns = useDefaultColumns(Resource.JOB);
  const tableActionProps = useTableActionProps();
  const pageSize = usePageSize();

  const columns: ColumnsType<IRole> = [
    ...defaultColumns,
    {
      dataIndex: ["application_url"],
      title: t("jobs.fields.application-url-id"),
      render: (appUrl: IAppUrl) => <UrlField value={appUrl.url}>{appUrl.name}</UrlField>,
    },
    {
      dataIndex: "roles",
      title: t("jobs.fields.process-role"),
      render: (roles: IRole[]) => <TagList resource={Resource.ROLE} records={roles} />,
    },
    {
      key: "is_template",
      dataIndex: "is_template",
      title: t("jobs.fields.is-template.label"),
      width: 120,
      render: (value: boolean) => (
        <TagField
          color={value ? "green" : "red"}
          value={t(`jobs.fields.is-template.${value ? "true" : "false"}`)}
        />
      ),
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
