import React from "react";

import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Collapse } from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { Resource } from "services/enums";
import { usePanelHeader } from "hooks/common";
import { DndProvider } from "react-dnd";
import { Container } from "./show/container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CaretRightOutlined } from "@ant-design/icons";
import { useSearchParams } from "@pankod/refine-react-router-v6";

export const CourseForm: React.FC<IResourceComponentsProps> = () => {
  const resource = Resource.COURSE;
  const [searchParams] = useSearchParams();
  const activeKey = searchParams.get("key");
  const { Panel } = Collapse;
  const t = useTranslate();
  return (
    <>
      <DrawerForm resource={resource} />
      <Collapse
        defaultActiveKey={activeKey ? [activeKey] : ["1"]}
        style={{ gap: "8px" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel
          header={usePanelHeader("Course designer", "Page content")}
          key='1'
          style={{ padding: "0" }}
        >
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </Panel>
      </Collapse>
    </>
  );
};
