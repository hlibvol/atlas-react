import React, { useState } from "react";
import { Drawer as AntDDrawer, Space, Button } from "@pankod/refine-antd";
import { Action } from "services/enums";
import type { DrawerProps } from "antd/es/drawer";
import { useAppSelector } from "redux/hooks";
import { useTranslate } from "@pankod/refine-core";
import { useResources } from "hooks/resource";
import { ExpandOutlined } from "@ant-design/icons";

const Drawer: React.FC = () => {
  const { action, title, resource, footer, onClose, extra, width } = useAppSelector(
    (state) => state.drawer
  );
  const t = useTranslate();
  const resources = useResources();
  const formElement = resources.find((r) => r.name === resource)?.form;
  return (
    <AntDDrawer
      title={action === Action.CREATE ? t(`${resource}.titles.create`) : title}
      width={width}
      onClose={onClose}
      visible={action === Action.CREATE || action === Action.EDIT}
      bodyStyle={{ paddingBottom: 80 }}
      extra={extra}
      footer={footer}
    >
      {formElement}
    </AntDDrawer>
  );
};

export default Drawer;
