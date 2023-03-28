import React from "react";

import { IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";
import { UrlField } from "@pankod/refine-antd";

import { TagList } from "components/core";
import { IJob } from "interfaces";
import { Resource } from "services/enums";
import List from "components/resource/list";
import Drawer from "components/resource/drawer";

export const ApplicationURLList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });

  const renderAssociatedJobs = (applicationUrlId: number) => {
    const associatedJobs = jobs
      ? jobs.data.filter((item) => item.application_url_id === applicationUrlId)
      : [];
    return <TagList resource={Resource.JOB} records={associatedJobs} />;
  };

  const columns = [
    {
      dataIndex: "url",
      title: t("application-urls.fields.url"),
      render: (url: string) => <UrlField value={url} />,
    },
    // {
    //   dataIndex: "id",
    //   title: "Associate jobs",
    //   render: renderAssociatedJobs,
    // },
  ];

  return (
    <>
      <List columns={columns} resource={Resource.APPLICATION_URL} />
      <Drawer />
    </>
  );
};
