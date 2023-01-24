import { useTranslate, IResourceComponentsProps, useList } from "@pankod/refine-core";
import { List, Table } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { IRole, IJob } from "interfaces";
import { ABPopOverList } from "components/popover";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.ROLE });
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });
  const tableActionProps = useTableActionProps({
    disabledDelete:
      jobs && jobs?.data.length
        ? "Cannot delete this role as it is already assigned to a job."
        : false,
  });

  const renderAssociatedJobs = (roleId: number, record: IRole) => {
    const associatedJobs = jobs ? jobs.data.filter((item) => item.role_ids.includes(roleId)) : [];
    return (
      <ABPopOverList
        resource={Resource.JOB}
        records={associatedJobs}
        title={`Associated jobs for role ${record.name}`}
      />
    );
  };

  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column dataIndex='name' title={t("roles.fields.title")} />
        <Table.Column
          dataIndex='description'
          title={t("roles.fields.description")}
          render={(description: string) => (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        />
        <Table.Column dataIndex={["id"]} title={"Associate jobs"} render={renderAssociatedJobs} />
        <Table.Column<IRole> {...tableActionProps} />
      </Table>
    </List>
  );
};
