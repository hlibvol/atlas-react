import React from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { Button } from "@pankod/refine-antd";

export const UseCaseForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.USE_CASE;

  const footer =
    itemId && action === Action.EDIT ? (
      <Button href={`/editor/${resource}/${itemId}`} target='_blank'>
        Design Use Case
      </Button>
    ) : null;

  return <DrawerForm resource={resource} footer={footer} />;
};
