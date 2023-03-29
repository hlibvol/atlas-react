import React from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Button, Form, Input, Select, useSelect } from "@pankod/refine-antd";
import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { IJob, IScreens } from "interfaces";

export const ScreenForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId, activeField, hideAll } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.SCREENS;
  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (screenJob: IScreens | BaseRecord) => (
    <>
      <Form.Item label={t("screens.fields.associatedJob")} name='job_ids'>
        <Select
          {...jobSelectProps}
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
        hidden={hideAll}
      >
        <Input placeholder={`Enter ${t("screens.fields.screenUrl")}`} tabIndex={1} />
      </Form.Item>
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
