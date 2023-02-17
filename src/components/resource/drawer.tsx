import React from "react";
import { DeleteButton, Drawer as AntDDrawer, Space } from "@pankod/refine-antd";
import { Action } from "services/enums";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { closeDrawer } from "redux/slices/drawerSlice";
import { useTranslate } from "@pankod/refine-core";

import { useResources } from "hooks/resource";

const Drawer: React.FC = () => {
  const { action, title, resource, itemId, footer } = useAppSelector((state) => state.drawer);
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
      footer={
        <>
          {footer}{" "}
          {action !== Action.CREATE && (
            <DeleteButton
              resourceNameOrRouteName={resource}
              recordItemId={itemId}
              confirmOkText='Yes'
              confirmCancelText='No'
              onSuccess={onClose}
              type='default'
              style={{ float: "right", color: "#626262", borderColor: "#d9d9d9" }}
            />
          )}
        </>
      }
    >
      {formElement}
    </AntDDrawer>
  );
};

export default Drawer;
