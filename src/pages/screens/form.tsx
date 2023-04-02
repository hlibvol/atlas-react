import React from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, FormInstance, Input, Select, useSelect } from "@pankod/refine-antd";
import { DrawerForm } from "components/resource/form";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { IAppType, IJob, IScreen } from "interfaces";

export const ScreenForm: React.FC<IResourceComponentsProps> = () => {
  const { activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.SCREEN;
  const { selectProps: jobSelectProps, queryResult: jobs } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: typeSelectProps } = useSelect<IAppType>({
    resource: Resource.APPLICATION_TYPE,
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (screenJob: IScreen | BaseRecord, form: FormInstance) => {
    const handleAppTypeChange = () => {
      form.setFieldsValue({ job_ids: [] });
    };
    const appTypeId = form.getFieldValue("application_type_id");
    const jobIds = jobs.data?.data
      .map((job) => {
        if (job.application_type_id === appTypeId) return job.id;
      })
      .filter((id) => id !== undefined);

    const jobOptions =
      jobIds && jobIds.length > 0 && jobSelectProps.options
        ? jobSelectProps.options.filter((url) => jobIds.includes(url.value as number))
        : [];

    return (
      <>
        <Form.Item
          label={t("jobs.fields.application-type")}
          name='application_type_id'
          rules={[
            {
              required: true,
            },
          ]}
        >
          {
            // @ts-ignore
            <Select
              {...typeSelectProps}
              placeholder='Select Application Type'
              onChange={handleAppTypeChange}
            />
          }
        </Form.Item>
        <Form.Item label={t("screens.fields.associatedJob")} name='job_ids'>
          <Select
            options={jobOptions}
            autoFocus={activeField === "job_ids"}
            placeholder='Select Jobs'
            mode='multiple'
          />
        </Form.Item>
        <Form.Item
          label={t("screens.fields.screenUrl")}
          name='screen_url'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={`Enter ${t("screens.fields.screenUrl")}`} tabIndex={1} />
        </Form.Item>
      </>
    );
  };
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
