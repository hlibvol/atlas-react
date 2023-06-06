import React from "react";

import { BaseRecord, IResourceComponentsProps, useList, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { DrawerForm } from "components/Resource/form";
import { IAppUrl, IJob } from "interfaces";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { SelectResource } from "components/Resource/select";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const { itemId } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.APPLICATION_URL;

  const { data } = useList<IJob>({
    resource: Resource.JOB,
  });

  const allJobs = data?.data ?? [];

  const filteredAssociatedJob = allJobs
    .filter((job) => job.application_url_id === itemId)
    .map((job) => job.name);

  const renderFields = (applicationUrl: IAppUrl | BaseRecord) => (
    <>
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
      {/* <Form.Item label={t("application-urls.fields.job_ids")} name='job_ids'>
        <Select
          mode='multiple'
          disabled
          placeholder='No Jobs'
          autoFocus={activeField === "job_ids"}
          defaultValue={filteredAssociatedJob}
        />
      </Form.Item> */}
      <SelectResource resource={Resource.JOB} name='job_ids' isMulti disabledField />
      <SelectResource resource={Resource.APPLICATION_TYPE} name='application_type_id' required />
    </>
  );

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
