import React from "react";
import { Resource } from "services/enums";

import { IResourceComponentsProps } from "@pankod/refine-core";
import List from "components/resource/list";
import Drawer from "components/resource/drawer";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.PLAYBOOK} />
      <Drawer />
    </>
  );
};
