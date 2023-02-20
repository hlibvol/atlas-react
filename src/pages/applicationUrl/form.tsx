import React from "react";

import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { IAppUrl } from "interfaces";
import { Resource } from "services/enums";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const resource = Resource.APPLICATION_URL;
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

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
