import { SiderRenderProps } from "@refinedev/ui-types/src/types/layout";
import { Sider as DefaultSider } from "@refinedev/antd";
import { Title } from "components";
import React from "react";

import { closeDrawer } from "redux/slices/drawerSlice";
import { useAppDispatch } from "redux/hooks";

export const Sider: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <DefaultSider
      Title={Title}
      render={({ items }: SiderRenderProps) => {
        return items.map((item) => {
          return React.cloneElement(item, {
            onClick: () => {
              dispatch(closeDrawer());
            },
          });
        });
      }}
    />
  );
};
