import React from "react";
// import {  Drawer as AntDDrawer } from "@pankod/refine-antd";
import { Drawer as AntDDrawer } from "antd";

import { Action } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { useTranslate } from "@pankod/refine-core";
import { useResources } from "hooks/resource";

const Drawer: React.FC = () => {
  const { action, title, resource, footer, onClose, extra } = useAppSelector(
    (state) => state.drawer
  );
  const t = useTranslate();
  const resources = useResources();
  const formElement = resources.find((r) => r.name === resource)?.form;
  return (
    <AntDDrawer
      title={action === Action.CREATE ? t(`${resource}.titles.create`) : title}
      width='100%'
      onClose={onClose}
      visible={action === Action.CREATE || action === Action.EDIT}
      bodyStyle={{ paddingBottom: 80 }}
      extra={extra}
      footer={footer}
      getContainer={() => document.getElementsByClassName("ant-page-header")[0] as HTMLElement}
      style={{ position: "absolute" }}
      contentWrapperStyle={{ height: "inherit" }}
      placement='top'
    >
      {formElement}
    </AntDDrawer>
  );
};

export default Drawer;
