import React from "react";
import { Grid, Layout as AntdLayout } from "antd";
import { RefineLayoutLayoutProps } from "@refinedev/antd";
import { Header, Sider } from "components";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({ children, Footer, OffLayoutArea }) => {
  const breakpoint = Grid.useBreakpoint();
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <Sider />
      <AntdLayout>
        <Header />
        <AntdLayout.Content>
          <div
            style={{
              minHeight: 360,
              padding: isSmall ? 24 : 12,
            }}
          >
            {children}
          </div>
          {OffLayoutArea && <OffLayoutArea />}
        </AntdLayout.Content>
        {Footer && <Footer />}
      </AntdLayout>
    </AntdLayout>
  );
};
