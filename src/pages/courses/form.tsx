import React from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";

export const CourseForm: React.FC<IResourceComponentsProps> = () => {
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.COURSE;
  const footer =
    itemId && action === Action.EDIT ? (
      <Button href={`/courses/${itemId}`} target='_blank'>
        Course Content
      </Button>
    ) : null;

  return <DrawerForm resource={resource} footer={footer} />;
};
