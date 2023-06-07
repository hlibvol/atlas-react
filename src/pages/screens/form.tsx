import React from "react";
import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Form, FormInstance, Input } from "antd";
import { useSelect } from "@refinedev/antd";
import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";
import { IJob, IScreen } from "interfaces";
import { SelectResource } from "components/Resource/select";

export const ScreenForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { selectProps: jobSelectProps, queryResult: jobs } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (screenJob: IScreen | BaseRecord, form: FormInstance) => {
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

    return [
      {
        tabKey: "1",
        field: (
          <>
            <SelectResource
              name='application_type_id'
              resource={Resource.APPLICATION_TYPE}
              onChange={() => {
                form.setFieldsValue({ job_ids: [] });
              }}
              required
            />
            <SelectResource resource={Resource.JOB} name='job_ids' options={jobOptions} isMulti />

            <Form.Item
              label={t("screens.fields.screen_url")}
              name='screen_url'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder={`Enter ${t("screens.fields.screen_url")}`} tabIndex={1} />
            </Form.Item>
          </>
        ),
      },
    ];
  };

  return <DrawerForm resource={Resource.SCREEN} renderFields={renderFields} />;
};
