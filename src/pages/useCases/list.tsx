import { useTranslate, IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { List, Table, UrlField, Tag } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { IJob, IRole, IUseCase } from "interfaces";

export const UseCaseList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.USE_CASE });
  const tableActionProps = useTableActionProps();
  const { editUrl } = useNavigation();
  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column dataIndex='name' title={t("use-cases.fields.title")} />
        <Table.Column
          dataIndex={"roles"}
          title={t("use-cases.fields.use-case-role")}
          render={(roles) =>
            roles?.map((role: IRole) => (
              <Tag color='blue'>
                <UrlField value={editUrl(Resource.ROLE, role.id)}>{role.name}</UrlField>
              </Tag>
            ))
          }
        />
        <Table.Column
          dataIndex={"jobs"}
          title={t("use-cases.fields.use-case-job")}
          render={(jobs) =>
            jobs.map((job: IJob) => (
              <Tag color='blue'>
                <UrlField value={editUrl(Resource.JOB, job.id)}>{job.name}</UrlField>
              </Tag>
            ))
          }
        />
        <Table.Column<IUseCase> {...tableActionProps} />
      </Table>
    </List>
  );
};
