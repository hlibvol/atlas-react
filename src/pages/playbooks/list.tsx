import React from "react";
import { Resource } from "services/enums";

import { BaseRecord, IResourceComponentsProps } from "@pankod/refine-core";
import List from "components/Resource/list";
import Drawer from "components/Resource/drawer";
import { RoleAction } from "components/ListAction";
import { IRole } from "interfaces";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const renderActions = (record: IRole | BaseRecord) => {
    return (
      <>
        <RoleAction record={record} />
      </>
    );
  };

  return (
    <>
      <List resource={Resource.PLAYBOOK} renderActions={renderActions} />
      <Drawer />
    </>
  );
};
