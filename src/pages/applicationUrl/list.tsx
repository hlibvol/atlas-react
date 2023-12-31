import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { UrlField } from "@refinedev/antd";
import { Resource } from "services/enums";
import List from "components/Resource/list";

export const ApplicationURLList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: "url",
      title: t("application-urls.fields.url"),
      render: (url: string) => <UrlField value={url} />,
    },
  ];
  return <List columns={columns} resource={Resource.APPLICATION_URL} />;
};
