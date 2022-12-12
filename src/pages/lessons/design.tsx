import { IResourceComponentsProps, useShow, useTranslate } from "@pankod/refine-core";

import { Row, Col, Typography, Card, Show } from "@pankod/refine-antd";

const { Text } = Typography;

import { ILesson } from "interfaces";
import { Editor } from "components/designer/editor";

export const LessonDesign: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { queryResult: lessonQueryResult } = useShow<ILesson>();
  const lesson = lessonQueryResult.data?.data;
  const source_id = lesson?.id;

  return (
    <Show title={lesson?.name} headerButtons={() => <></>}>
      <Row gutter={20} wrap>
        <Col xs={24} lg={24}>
          <Card style={{ height: "100%" }}>
            {source_id ? <Editor resource='lessons' id={source_id} /> : null}
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
