import React from "react";

import { IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { Button, Space } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const PlaybookForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.PLAYBOOK;
  const { showUrl } = useNavigation();
  const footer =
    itemId && action === Action.EDIT ? (
      <Space>
        <Button type='primary' href={`/editor/${resource}/${itemId}`} target='_blank'>
          Design Playbook
        </Button>
        <Button type='primary' href={showUrl(Resource.PLAYBOOK, itemId)} target='_blank'>
          Preview Playbook
        </Button>
      </Space>
    ) : null;

  return <DrawerForm resource={resource} footer={footer} />;
};
