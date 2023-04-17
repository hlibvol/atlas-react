import React from "react";
import { Resource } from "services/enums";

import { IResourceComponentsProps } from "@pankod/refine-core";
import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <List resource={Resource.PLAYBOOK} />
      <Drawer />
    </>
  );
};
