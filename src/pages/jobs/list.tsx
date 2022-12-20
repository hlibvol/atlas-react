import { useTranslate, IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { List, Table, TagField, UrlField, Tag } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { IAppUrl, IJob, IRole } from "interfaces";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.JOB });
  const tableActionProps = useTableActionProps();
  const { editUrl, showUrl } = useNavigation();
  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column
          dataIndex='name'
          title={t("jobs.fields.title")}
          render={(name: string, job: IJob) => (
            <UrlField value={showUrl(Resource.JOB, job.id)}>{name}</UrlField>
          )}
        />
        <Table.Column
          dataIndex={["application_url"]}
          title={t("jobs.fields.application-url-id")}
          render={(appUrl: IAppUrl) => <UrlField value={appUrl.url}>{appUrl.name}</UrlField>}
        />
        <Table.Column
          dataIndex={"roles"}
          title={t("jobs.fields.process-role")}
          render={(roles) =>
            roles.map((item: IRole) => (
              <Tag key={item.id} color='blue'>
                <UrlField value={editUrl(Resource.ROLE, item.id)}>{item.name}</UrlField>
              </Tag>
            ))
          }
        />
        <Table.Column
          key='is_template'
          dataIndex='is_template'
          title={t("jobs.fields.is-template.label")}
          render={(value) => (
            <TagField
              color={value ? "green" : "red"}
              value={t(`jobs.fields.is-template.${value ? "true" : "false"}`)}
            />
          )}
        />
        <Table.Column<IJob> {...tableActionProps} />
      </Table>
    </List>
  );
};
