import React from "react";

import { IResourceComponentsProps, useList, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";
import List from "components/resource/list";
import Drawer from "components/resource/drawer";

export const ScreenList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.SCREENS} />
      <Drawer />
    </>
  );
};
