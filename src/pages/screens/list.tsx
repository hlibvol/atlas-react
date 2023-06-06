import React from "react";

import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { Tag } from "antd";

export const ScreenList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: ["application_type", "name"],
      title: t("screens.fields.application_type_id"),
      render: (name: string) => (name ? <Tag color='blue'>{name}</Tag> : null),
    },
  ];
  return <List resource={Resource.SCREEN} columns={columns} />;
};
