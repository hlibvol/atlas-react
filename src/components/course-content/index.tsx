import React, { useEffect } from "react";
import { Collapse, Form, Input, Row } from "@pankod/refine-antd";
import { useParams } from "@pankod/refine-react-router-v6";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./../../../src/pages/courses/show/container";
import { useTranslate } from "@pankod/refine-core";

export const CourseContent = () => {
  const { Panel } = Collapse;
  const { action, id } = useParams();
  const t = useTranslate();

  return (
    <CreateOrEditForm>
      {/* {action === "edit" && ( */}
      <Panel
        header={usePanelHeader("Course designer", "Page content")}
        key='1'
        style={{ padding: "0" }}
      >
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </Panel>
      {/* )} */}
    </CreateOrEditForm>
  );
};

// export default index
