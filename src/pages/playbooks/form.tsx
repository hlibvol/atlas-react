import React from "react";

import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Button, Space } from "antd";
import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { DrawerForm } from "components/Resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { SelectResource } from "components/Resource/select";

export const PlaybookForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.PLAYBOOK;
  const { showUrl } = useNavigation();
  const footer =
    itemId && action === Action.EDIT ? (
      <Space>
        <Button
          icon={<PlayCircleOutlined rev={undefined} />}
          type='primary'
          href={`/editor/${resource}/${itemId}`}
          target='_blank'
        >
          Design Playbook
        </Button>
        <Button
          icon={<EyeOutlined rev={undefined} />}
          type='primary'
          href={showUrl(Resource.PLAYBOOK, itemId)}
          target='_blank'
        >
          Preview Playbook
        </Button>
      </Space>
    ) : null;

  const renderFields = () => {
    return <SelectResource resource={Resource.ROLE} name='role_ids' isMulti />;
  };

  return <DrawerForm resource={resource} footer={footer} renderFields={renderFields} />;
};
