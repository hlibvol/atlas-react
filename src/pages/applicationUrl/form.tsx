import React from "react";

import { BaseRecord, IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";
import { Form, Input, UrlField } from "@pankod/refine-antd";

import { ABDivider, HTMLContent, TagList } from "components/core";
import { DrawerForm } from "components/resource/form";
import { IAppUrl, IJob } from "interfaces";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.APPLICATION_URL;
  const { data: jobs } = useList<IJob>({
    resource: Resource.JOB,
  });

  const renderAssociatedJobs = (applicationUrlId: number) => {
    const associatedJobs = jobs
      ? jobs.data.filter((item) => item.application_url_id === applicationUrlId)
      : [];
    return <TagList resource={Resource.JOB} records={associatedJobs} />;
  };

  const renderFields = (applicationUrl: IAppUrl | BaseRecord) => (
    <Form.Item
      label={t("application-urls.fields.url")}
      name='url'
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );

  const renderShow = (applicationUrl: IAppUrl | BaseRecord) => (
    <>
      <ABDivider>{t("application-urls.fields.url")}</ABDivider>
      <UrlField value={applicationUrl.url} />
      <ABDivider>{t("application-urls.fields.description")}</ABDivider>
      {applicationUrl.description && <HTMLContent>{applicationUrl.description}</HTMLContent>}

      <ABDivider>Associated Jobs</ABDivider>
      {renderAssociatedJobs(applicationUrl.id as number)}
    </>
  );

  return <DrawerForm resource={resource} renderFields={renderFields} hasDefaultColumns />;
};
