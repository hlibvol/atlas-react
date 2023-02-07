import React from "react";
import { Resource } from "services/enums";

import { TagList } from "components/core";
import { IRole } from "interfaces";
import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import List from "components/resource/list";
import Drawer from "components/resource/drawer";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const columns = [
    {
      dataIndex: "roles",
      title: t("playbooks.fields.process-role"),
      render: (roles: IRole[]) => <TagList resource={Resource.ROLE} records={roles} />,
    },
  ];

  return (
    <>
      <List columns={columns} resource={Resource.PLAYBOOK} hasRoles />
      <Drawer />
    </>
  );
};
