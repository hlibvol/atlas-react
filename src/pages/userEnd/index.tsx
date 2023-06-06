import React from "react";
import { Layout } from "antd";

import { UserEndHeader } from "components/UserEnd/Header";
import { UserEndCourseCard } from "components/UserEnd/UserEndCourseCard";
export const UserEnd: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <Layout>
        <UserEndHeader />
        <Layout.Content>
          <div style={{ padding: 24, minHeight: 360 }}>
            <h1>Courses</h1>
            <UserEndCourseCard />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
