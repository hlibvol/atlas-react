import React from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Select, useSelect } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { IAppUrl, IJob } from "interfaces";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId, activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.APPLICATION_URL;

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: typeSelectProps } = useSelect<IAppUrl>({
    resource: Resource.APPLICATION_URL,
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
          {...jobSelectProps}
          autoFocus={activeField === "job_ids"}
          placeholder='Select Jobs'
          mode='multiple'
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
