import { IResourceComponentsProps, useShow, useGetIdentity, useTranslate } from "@refinedev/core";
import { Space, Button } from "antd";
import { Show, UrlField } from "@refinedev/antd";
import { PlayCircleOutlined, AntDesignOutlined } from "@ant-design/icons";

import { ABDivider, HTMLContent, TagList } from "components/core";
import { IJob, IUser } from "interfaces";
import { Resource } from "services/enums";

export const JobShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult: jobQueryResult } = useShow<IJob>();
  const { data, isLoading } = jobQueryResult;
  const job = data?.data;
  const { data: user } = useGetIdentity<IUser>();
  const t = useTranslate();
  const urlSuffix = `${user?.id}/${job?.id}/${(Math.random() + 1).toString(36).substring(2)}`;

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        title: job?.name,
      }}
    >
      {!isLoading ? (
        <>
          <ABDivider>{t("jobs.fields.description")}</ABDivider>
          {job?.description && <HTMLContent>{job.description}</HTMLContent>}

          <ABDivider>Associated Roles</ABDivider>
          {job?.roles && <TagList resource={Resource.ROLE} records={job.roles} />}

          <ABDivider>{t("jobs.fields.application-url-id")}</ABDivider>
          <UrlField value={job?.application_url.url}>
            {job?.application_url.name} : {job?.application_url.url}
          </UrlField>

          <ABDivider>Designer Options</ABDivider>
          <Space wrap>
            <Button
              type='primary'
              size='small'
              icon={<PlayCircleOutlined rev={undefined} />}
              target='_blank'
              href={`ab:job/executor/${urlSuffix}`}
            >
              Execute Job
            </Button>
            {user?.is_designer && (
              <Button
                type='primary'
                size='small'
                icon={<AntDesignOutlined rev={undefined} />}
                target='_blank'
                href={`ab:job/designer/${urlSuffix}`}
              >
                Open Designer
              </Button>
            )}
          </Space>
        </>
      ) : null}
    </Show>
  );
};
