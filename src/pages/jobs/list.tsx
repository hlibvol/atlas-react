import { useTranslate, IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { TagField, UrlField } from "@refinedev/antd";
import { Resource } from "services/enums";
import { IRole } from "interfaces";
import List from "components/Resource/list";
import { RoleAction } from "components/ListAction";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["application_url.name"],
      title: t("jobs.fields.application-url-id"),
      render: (id: number, job: BaseRecord) => (
        <UrlField value={job.application_url?.url}>{job.application_url?.name}</UrlField>
      ),
    },
    {
      key: "is_template",
      dataIndex: "is_template",
      title: t("jobs.fields.is_template.label"),
      width: 120,
      render: (value: boolean) => (
        <TagField
          color={value ? "green" : "red"}
          value={t(`jobs.fields.is_template.${value ? "true" : "false"}`)}
        />
      ),
    },
  ];

  const renderActions = (record: IRole | BaseRecord) => {
    return (
      <>
        <RoleAction record={record} />
      </>
    );
  };

  return <List columns={columns} resource={Resource.JOB} renderActions={renderActions} />;
};
