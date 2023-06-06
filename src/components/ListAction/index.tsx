import React from "react";
import { Tooltip, Button } from "antd";
import { Action } from "services/enums";
import { BaseRecord } from "@refinedev/core";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { UserOutlined } from "@ant-design/icons";
import { openDrawer } from "redux/slices/drawerSlice";

type ListActionProps = {
  record?: BaseRecord;
};

export const RoleAction: React.FC<ListActionProps> = ({ record }) => {
  const { resource } = useAppSelector((state) => state.drawer);
  const dispatch = useAppDispatch();
  return (
    <Tooltip title='Process Roles' color='green'>
      <Button
        icon={<UserOutlined rev={undefined} />}
        size='small'
        type='primary'
        ghost
        onClick={() => {
          dispatch(
            openDrawer({
              resource: resource,
              action: Action.EDIT,
              itemId: record?.id,
              activeField: "role_ids",
            })
          );
        }}
      />
    </Tooltip>
  );
};
