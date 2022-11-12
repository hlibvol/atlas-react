import { useShow, useTranslate } from '@pankod/refine-core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './show/container';
import { Col, Row, Show } from '@pankod/refine-antd';
import { ICourse } from 'interfaces';

export const CourseShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult: courseQueryResult } = useShow<ICourse>();
  const course = courseQueryResult.data?.data;
  const courseid = course?.id;
  return (
    <Show title={course?.name} headerButtons={() => <></>}>
      <Row gutter={20} wrap>
        <Col xs={24} lg={24}>
          <DndProvider backend={HTML5Backend}>
            {courseid ? <Container courseid={courseid} /> : null}
          </DndProvider>
        </Col>
      </Row>
    </Show>
  );
};
