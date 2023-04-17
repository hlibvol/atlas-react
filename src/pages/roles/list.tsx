import { IResourceComponentsProps, useList } from "@pankod/refine-core";
import { Table } from "@pankod/refine-antd";
import {
  useTableProps,
  useTableActionProps,
  useDefaultColumns,
  defaultColumnProps,
  usePageSize,
} from "hooks/table";
import { Resource } from "services/enums";
import { IRole, IJob } from "interfaces";
import { TagList } from "components/core";
import type { ColumnsType } from "antd/es/table";

import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.ROLE} />
      <Drawer />
    </>
  );
  // const tableProps = useTableProps({ resource: Resource.ROLE });
  // const defaultColumns = useDefaultColumns(Resource.ROLE);
  // const { data: jobs } = useList<IJob>({
  //   resource: Resource.JOB,
  // });
  // const tableActionProps = useTableActionProps({
  //   disabledDelete:
  //     jobs && jobs?.data.length
  //       ? "Cannot delete this role as it is already assigned to a job."
  //       : false,
  // });
  // const pageSize = usePageSize();

  // const renderAssociatedJobs = (roleId: number) => {
  //   const associatedJobs = jobs ? jobs.data.filter((item) => item.role_ids.includes(roleId)) : [];
  //   return <TagList resource={Resource.JOB} records={associatedJobs} />;
  // };

  // const columns: ColumnsType<IRole> = [
  //   ...defaultColumns,
  //   {
  //     dataIndex: "id",
  //     title: "Associate jobs",
  //     render: renderAssociatedJobs,
  //   },
  //   tableActionProps,
  // ];

  // return (
  //   <List breadcrumb={false}>
  //     <Table
  //       {...tableProps}
  //       {...(pageSize && { pagination: { ...tableProps.pagination, pageSize } })}
  //       // @ts-ignore
  //       columns={columns.map((item) => ({ ...item, ...defaultColumnProps }))}
  //     ></Table>
  //   </List>
  // );
};
