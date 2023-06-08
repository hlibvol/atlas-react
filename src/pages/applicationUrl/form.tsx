import React from "react";
import { IResourceComponentsProps, useTranslate, useList } from "@refinedev/core";
import { Form, Input, Tag, Typography } from "antd";
import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";
import { SelectResource } from "components/Resource/select";
import { IJob } from "interfaces";
import { useAppSelector } from "redux/hooks";

export const ApplicationURLForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.APPLICATION_URL;

  const { data } = useList<IJob>({
    resource: Resource.JOB,
  });

  const allJobs = data?.data ?? [];

  const filteredAssociatedJob = allJobs
    .filter((job) => job.application_url_id === itemId)
    .map((job) => (
      <Tag color='default' style={{ fontSize: "13px" }}>
        {job.name}
      </Tag>
    ));
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
      field: (
        <>
          <h4 style={{ fontWeight: "bold" }}>Associated Jobs</h4>
          <Typography.Text>{filteredAssociatedJob}</Typography.Text>
        </>
      ),
    },
  ];

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
