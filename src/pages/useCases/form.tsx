import React from "react";

import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { DrawerForm } from "components/Resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { Button } from "@pankod/refine-antd";
import { BorderHorizontalOutlined } from "@ant-design/icons";

export const UseCaseForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.USE_CASE;

  const footer =
    itemId && action === Action.EDIT ? (
      <Button
        icon={<BorderHorizontalOutlined />}
        type='primary'
        href={`/${resource}/${itemId}`}
        target='_blank'
      >
        {t("buttons.role-job-matrix")}
      </Button>
    ) : null;

  return <DrawerForm resource={resource} footer={footer} />;
};
