import { useTranslate, IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { Resource } from "services/enums";
import Drawer from "components/Resource/drawer";
import List from "components/Resource/list";

export const ProgramList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  // const columns = [
  //   {
  //     dataIndex: ["application_url.name"],
  //     title: t("jobs.fields.application-url-id"),
  //     render: (id: number, job: BaseRecord) => (
  //       <UrlField value={job.application_url?.url}>{job.application_url?.name}</UrlField>
  //     ),
  //   },
  //   {
  //     key: "is_template",
  //     dataIndex: "is_template",
  //     title: t("jobs.fields.is-template.label"),
  //     width: 120,
  //     render: (value: boolean) => (
  //       <TagField
  //         color={value ? "green" : "red"}
  //         value={t(`jobs.fields.is-template.${value ? "true" : "false"}`)}
  //       />
  //     ),
  //   },
  // ];
  return (
    <>
      <List resource={Resource.PROGRAMS} />
      <Drawer />
    </>
  );
};
