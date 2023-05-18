import { AntdLayout, Button, Col, Row, Spin } from "@pankod/refine-antd";
import { useShow } from "@pankod/refine-core";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import "../styles.scss";
import { useNavigate, useParams } from "@pankod/refine-react-router-v6";
import { Resource } from "services/enums";
import { ILesson } from "interfaces";
import { renderPagesHtml } from "hooks/common";
import { useEffect, useState } from "react";

interface IContentProps {
  totalLessonCount: number | undefined;
  courseItemsCountData: any | undefined;
}

export const LearningContent: React.FC<IContentProps> = (props) => {
  const { itemId, courseId } = useParams();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [url, setUrl] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    setUrl(props);
  }, [props]);

  const nextLearningPage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.courseItemsCountData.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentPage(currentPage + 1);
    navigate(
      `/learning/course/${courseId}/learn-course/${url?.courseItemsCountData[currentIndex].item_id}`
    );
  };

  const previousLearningPage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.courseItemsCountData.length - 1 : prevIndex - 1
    );
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    navigate(
      `/learning/course/${courseId}/learn-course/${url?.courseItemsCountData[currentIndex].item_id}`
    );
  };

  const currentItem = props.courseItemsCountData && props.courseItemsCountData[currentIndex];

  const { queryResult } = useShow<ILesson>({
    resource: Resource.LESSON,
    id: currentItem?.item_id ? currentItem?.item_id : itemId,
  });
  const { data, isLoading, isError } = queryResult;
  const lesson = data?.data;
  const [currentPage, setCurrentPage] = useState(1);

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

  const pagesHtml =
    lesson && lesson.page_content ? JSON.parse(lesson.page_content).pagesHtml : null;

  return (
    <AntdLayout.Content
      style={{
        margin: "24px 0 0 1px",
        padding: 24,
        background: "#fff",
        minHeight: 280,
        overflow: "initial",
      }}
    >
      <Row className='lesson-header__top-wrap'>
        <Col span={16} offset={4}>
          <div className='lesson-header__counter'>
            <div>
              Lesson {currentPage} of {props.totalLessonCount}
            </div>
          </div>
          <div className='lesson-header__title'>
            <p>{lesson?.name}</p>
          </div>
          <div className='lesson-header__author'></div>
        </Col>
      </Row>
      <Row className='lesson-content'>
        <Col span={20} offset={4}>
          {renderPagesHtml(pagesHtml)}
        </Col>
      </Row>
      <Row style={{ marginTop: "20%", position: "sticky" }}>
        <Col span={20} offset={4}>
          <Row>
            <Col span={10}>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={previousLearningPage}
                {...(currentPage === 1 ? { disabled: true } : {})}
              >
                <LeftCircleOutlined /> Prev
              </Button>
            </Col>
            <Col span={10}>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={nextLearningPage}
                {...(currentPage === props.totalLessonCount ? { disabled: true } : {})}
              >
                Next <RightCircleOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </AntdLayout.Content>
  );
};
