import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const resource = Resource.APPLICATION_URL;
  const renderFields = () => [
    {
      tabKey: "1",
      field: (
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
      ),
    },
    {
      tabKey: "1",
      field: (
        <SelectResource resource={Resource.APPLICATION_TYPE} name='application_type_id' required />
      ),
    },
    {
      tabKey: "2",
      field: <SelectResource resource={Resource.JOB} name='job_ids' isMulti disabled />,
    },
  ];

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
