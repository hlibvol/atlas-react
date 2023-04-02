import React from "react";

import { BaseRecord, IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";
import { Form, Input, Select, useSelect } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { IAppType, IAppUrl, IJob } from "interfaces";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const { itemId, activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.APPLICATION_URL;

  const { data } = useList<IJob>({
    resource: Resource.JOB,
  });

  const allJobs = data?.data ?? [];

  const filteredAssociatedJob = allJobs
    .filter((job) => job.application_url_id === itemId)
    .map((job) => job.name);

  const { selectProps: typeSelectProps } = useSelect<IAppType>({
    resource: Resource.APPLICATION_TYPE,
    optionLabel: "name",
    optionValue: "id",
  });

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
      <Form.Item label={t("screens.fields.associatedJob")} name='job_ids'>
        <Select
          mode='multiple'
          disabled
          placeholder='No Jobs'
          autoFocus={activeField === "job_ids"}
          defaultValue={filteredAssociatedJob}
        />
      </Form.Item>
      <Form.Item
        label={t("application-urls.fields.type")}
        name='application_type_id'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...typeSelectProps} placeholder='Select Application Type' />
      </Form.Item>
    </>
  );

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
