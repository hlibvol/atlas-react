import React from "react";
import { Drawer as AntDDrawer } from "antd";

import { Action } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { useTranslate } from "@refinedev/core";
import { useResources } from "hooks/resource";

const Drawer: React.FC = () => {
  const { action, title, resource, footer, onClose, extra } = useAppSelector(
    (state) => state.drawer
  );
  const t = useTranslate();
  const resources = useResources();
  const formElement = resources.find((r) => r.name === resource)?.form;
  const Form = formElement ? formElement : () => null;
  return (
    <AntDDrawer
      title={action === Action.CREATE ? t(`${resource}.titles.create`) : title}
      width='100%'
      onClose={onClose}
      open={action === Action.CREATE || action === Action.EDIT}
      bodyStyle={{ paddingBottom: 80 }}
      extra={extra}
      footer={footer}
      getContainer={false}
      contentWrapperStyle={{ height: "-webkit-fill-available" }}
      placement='top'
    >
      <Form />
    </AntDDrawer>
  );
};

export default Drawer;
