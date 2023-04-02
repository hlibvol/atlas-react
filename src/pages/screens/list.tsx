import React from "react";

import { IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";
import List from "components/resource/list";
import Drawer from "components/resource/drawer";
import { UrlField } from "@pankod/refine-antd";

export const ScreenList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const columns = [
    {
      dataIndex: "type",
      title: t("screens.fields.application-type"),
      render: (url: string) => <UrlField value={url} />,
    },
  ];

  return (
    <>
      <List resource={Resource.SCREENS} columns={columns} />
      <Drawer />
    </>
  );
};
