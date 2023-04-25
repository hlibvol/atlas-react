import React from "react";
import { AntdLayout } from "@pankod/refine-antd";

import { UserEndHeader } from "components/UserEnd/Header";
import { UserEndCourseCard } from "components/UserEnd/UserEndCourseCard";
export const UserEnd: React.FC = () => {
  return (
    <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <AntdLayout>
        <UserEndHeader />
        <AntdLayout.Content>
          <div style={{ padding: 24, minHeight: 360 }}>
            <h1>Courses</h1>
            <UserEndCourseCard />
          </div>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};
