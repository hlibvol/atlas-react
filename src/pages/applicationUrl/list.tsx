import { useTranslate, IResourceComponentsProps, useList } from "@pankod/refine-core";
import { List, Table, UrlField } from "@pankod/refine-antd";

import { IAppUrl, IJob } from "interfaces";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { ABPopOverList } from "components/popover";

export const ApplicationURLList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.APPLICATION_URL });
  const tableActionProps = useTableActionProps({ hideShow: true });
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });

  const renderAssociatedJobs = (applicationUrlId: number, record: IAppUrl) => {
    const associatedJobs = jobs
      ? jobs.data.filter((item) => item.application_url_id === applicationUrlId)
      : [];
    return (
      <ABPopOverList
        resource={Resource.JOB}
        records={associatedJobs}
        title={`Associated jobs for application url: ${record.name}`}
      />
    );
  };

  return (
    <>
      <List breadcrumb={false}>
        <Table {...tableProps}>
          <Table.Column dataIndex='name' title={t("application-urls.fields.title")} />
          <Table.Column
            dataIndex='url'
            title={t("application-urls.fields.url")}
            render={(value: string) => <UrlField value={value} />}
          />
          <Table.Column dataIndex={["id"]} title={"Associate jobs"} render={renderAssociatedJobs} />
          <Table.Column<IAppUrl> {...tableActionProps} />
        </Table>
      </List>
    </>
  );
};
