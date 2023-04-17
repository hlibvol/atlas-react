import { useTranslate, IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { Table, TagField, UrlField } from "@pankod/refine-antd";
import {
  usePageSize,
  useTableProps,
  useTableActionProps,
  useDefaultColumns,
  defaultColumnProps,
} from "hooks/table";
import { Resource } from "services/enums";
import { IAppUrl, IJob, IRole } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import { TagList } from "components/core";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";

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
      title: t("jobs.fields.is-template.label"),
      width: 120,
      render: (value: boolean) => (
        <TagField
          color={value ? "green" : "red"}
          value={t(`jobs.fields.is-template.${value ? "true" : "false"}`)}
        />
      ),
    },
  ];
  return (
    <>
      <List columns={columns} resource={Resource.JOB} />
      <Drawer />
    </>
  );
};
