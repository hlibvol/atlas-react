import React from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const ScreenForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.SCREENS;
  return <DrawerForm resource={resource}  />;
};
