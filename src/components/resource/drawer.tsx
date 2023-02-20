import React from "react";
import { Drawer as AntDDrawer, Space } from "@pankod/refine-antd";
import { Action } from "services/enums";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { closeDrawer } from "redux/slices/drawerSlice";
import { useTranslate } from "@pankod/refine-core";

import { useResources } from "hooks/resource";

const Drawer: React.FC = () => {
  const { action, title, resource, footer } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(closeDrawer());
  };
  const resources = useResources();
  const formElement = resources.find((r) => r.name === resource)?.form;

  return (
    <AntDDrawer
      title={action === Action.CREATE ? t(`${resource}.titles.create`) : title}
      width='40%'
      onClose={onClose}
      visible={action === Action.CREATE || action === Action.EDIT}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<Space></Space>}
      footer={footer}
    >
      {formElement}
    </AntDDrawer>
  );
};

export default Drawer;
