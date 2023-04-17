import React from "react";

import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";
import { Tag } from "@pankod/refine-antd";

export const ScreenList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const columns = [
    {
      dataIndex: ["application_type", "name"],
      title: t("screens.fields.application-type"),
      render: (name: string) => (name ? <Tag color='blue'>{name}</Tag> : null),
    },
  ];

  return (
    <>
      <List resource={Resource.SCREEN} columns={columns} />
      <Drawer />
    </>
  );
};
