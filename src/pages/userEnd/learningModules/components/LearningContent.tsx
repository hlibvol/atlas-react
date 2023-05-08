import { AntdLayout, Button, Col, Icon, Menu, Row, Spin, Typography } from "@pankod/refine-antd";
import { useShow, useTranslate } from "@pankod/refine-core";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import "../styles.scss";
import { useParams } from "@pankod/refine-react-router-v6";
import { Resource } from "services/enums";
import { ILesson } from "interfaces";
import { renderPagesHtml } from "hooks/common";

interface IContentProps {
  totalLessonCount: number | undefined;
}

export const LearningContent: React.FC<IContentProps> = ({ totalLessonCount }) => {
  const { itemId } = useParams();
  const { queryResult } = useShow<ILesson>({ resource: Resource.LESSON, id: itemId });
  const { data, isLoading, isError } = queryResult;
  const lesson = data?.data;

  if (isLoading) {
    return (
      <Spin tip='Loading ' size='large' style={{ paddingTop: "50%" }}>
        <div className='content' />
      </Spin>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const currentPage = 1;

  const pagesHtml =
    lesson && lesson.page_content ? JSON.parse(lesson.page_content).pagesHtml : null;
  return (
    <AntdLayout.Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        minHeight: 280,
      }}
    >
      <Row className='lesson-header__top-wrap'>
        <Col span={16} offset={4}>
          <div className='lesson-header__counter'>
            <div>
              Lesson {currentPage} of {totalLessonCount}
            </div>
          </div>
          <div className='lesson-header__title'>
            <p>{lesson?.name}</p>
          </div>
          <div className='lesson-header__author'></div>
        </Col>
      </Row>
      <Row className='lesson-content'>
        <Col span={4}>
          <Button type='primary' shape='round' size='large'>
            <LeftCircleOutlined /> Prev
          </Button>
        </Col>
        <Col span={16}>{renderPagesHtml(pagesHtml)}</Col>
        <Col span={4}>
          <Button type='primary' shape='round' size='large'>
            Next <RightCircleOutlined />
          </Button>
        </Col>
      </Row>
    </AntdLayout.Content>
  );
};
