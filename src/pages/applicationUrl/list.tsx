import { useTranslate, IResourceComponentsProps, useList } from "@pankod/refine-core";
import { List, Table, UrlField } from "@pankod/refine-antd";

import { IAppUrl, IJob } from "interfaces";
import {
  useTableProps,
  useTableActionProps,
  defaultColumnProps,
  useDefaultColumns,
  usePageSize,
} from "hooks/table";
import { Resource } from "services/enums";
import { TagList } from "components/core";
import type { ColumnsType } from "antd/es/table";

export const ApplicationURLList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.APPLICATION_URL });
  const defaultColumns = useDefaultColumns(Resource.APPLICATION_URL);
  const tableActionProps = useTableActionProps();
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });
  const pageSize = usePageSize();

  const renderAssociatedJobs = (applicationUrlId: number) => {
    const associatedJobs = jobs
      ? jobs.data.filter((item) => item.application_url_id === applicationUrlId)
      : [];
    return <TagList resource={Resource.JOB} records={associatedJobs} />;
  };

  const columns: ColumnsType<IAppUrl> = [
    ...defaultColumns,
    {
      dataIndex: "url",
      title: t("application-urls.fields.url"),
      render: (url: string) => <UrlField value={url} />,
    },
    {
      dataIndex: "id",
      title: "Associate jobs",
      render: renderAssociatedJobs,
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
