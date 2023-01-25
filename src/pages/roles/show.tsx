import { IResourceComponentsProps, useShow, useList } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import { ABDivider, HTMLContent, TagList } from "components/core";
import { IJob, IRole } from "interfaces";
import { Resource } from "services/enums";

export const RoleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IRole>();
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });
  const { data, isLoading } = queryResult;
  const role = data?.data;
  const associatedJobs =
    jobs && role?.id ? jobs.data.filter((item) => item.role_ids.includes(role.id)) : [];

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        title: role?.name,
      }}
    >
      {!isLoading ? (
        <>
          <ABDivider>Description</ABDivider>
          {role?.description && <HTMLContent>{role.description}</HTMLContent>}
          <ABDivider>Associated Jobs</ABDivider>
          <TagList resource={Resource.JOB} records={associatedJobs} />
        </>
      ) : null}
    </Show>
  );
};
