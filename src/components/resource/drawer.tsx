import React from "react";
import { Button, DeleteButton, Drawer as AntDDrawer, EditButton, Space } from "@pankod/refine-antd";
import { Action } from "services/enums";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { openDrawer, closeDrawer } from "redux/slices/drawerSlice";
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
      visible={action === Action.CREATE || action === Action.EDIT || action === Action.VIEW}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          {action === Action.VIEW && (
            <EditButton
              resourceNameOrRouteName={resource}
              recordItemId={itemId}
              hideText
              onClick={() => dispatch(openDrawer({ resource, action: Action.EDIT, itemId }))}
            />
          )}
          {action !== Action.CREATE && (
            <DeleteButton
              resourceNameOrRouteName={resource}
              recordItemId={itemId}
              hideText
              confirmOkText='Yes'
              confirmCancelText='No'
              onSuccess={onClose}
            />
          )}
        </Space>
      }
      footer={footer}
    >
      {formElement}
    </AntDDrawer>
  );
};

export default Drawer;
