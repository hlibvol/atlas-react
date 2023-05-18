import React, { useState } from "react";
import { AntdLayout } from "@pankod/refine-antd";
import { LearningItems } from "./components/LearningItems";
import "./styles.scss";
import { LearningContent } from "./components/LearningContent";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Resource } from "services/enums";
import { useParams } from "@pankod/refine-react-router-v6";
import { useShow } from "@pankod/refine-core";
import { ICourse } from "interfaces";

export const LearningModules: React.FC = () => {
  const { courseId } = useParams<{ courseId: any }>();
  const { queryResult } = useShow<ICourse>({ resource: Resource.COURSE, id: courseId });
  const { data } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState([]) as Array<any>;
  const [collapsed, setCollapsed] = useState(false);
  if (course && course.items != courseItems) {
    const sortedArray = course.items.sort((a: any, b: any) => {
      return a.item_order - b.item_order;
    });
    setCourseItems(sortedArray);
  }

  const courseItemsCountData = course?.items.filter((lesson) => lesson.item_id !== 0);

  const totalLessonCount = courseItemsCountData?.length;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AntdLayout className='learning-module-layout'>
      {!collapsed && (
        <LearningItems collapsed={collapsed} courseItems={courseItems} courseId={courseId} />
      )}
      <AntdLayout className='learning-module-layout' style={{ marginLeft: 200 }}>
        <AntdLayout.Header
          style={{
            position: "fixed",
            top: 0,
            zIndex: 1,
            width: "100%",
            background: "#fff",
            padding: 0,
          }}
        >
          <span onClick={toggle} className='trigger'>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </AntdLayout.Header>
        <LearningContent
          totalLessonCount={totalLessonCount}
          courseItemsCountData={courseItemsCountData}
        />
      </AntdLayout>
    </AntdLayout>
  );
};
