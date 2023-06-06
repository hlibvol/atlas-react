import { Layout, Button, Col, Row, Spin } from "antd";
import { useOne } from "@refinedev/core";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import "../styles.scss";
import { useParams } from "react-router-dom";
import { Resource } from "services/enums";
import { ICourseItem, ILesson } from "interfaces";
import { renderPagesHtml } from "hooks/common";
import { useEffect, useState } from "react";

interface IContentProps {
  courseItems: ICourseItem[];
}

export const LearningContent: React.FC<IContentProps> = ({ courseItems }: IContentProps) => {
  const { itemId } = useParams();
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  useEffect(() => {
    if (courseItems.length == 0) return;
    const currentIndex =
      courseItems.findIndex((item: ICourseItem) => item.item_id === Number(itemId)) || 0;
    setCurrentIndex(currentIndex + 1);
  }, [courseItems]);

  const { data, isLoading, isError } = useOne<ILesson>({
    resource: Resource.LESSON,
    id: courseItems.length == 0 ? Number(itemId) : courseItems[currentIndex - 1]?.item_id,
  });
  const currentItem = data?.data;

  const nextPageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === courseItems.length - 1 ? 0 : prevIndex + 1));
  };

  const previousPageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? courseItems.length - 1 : prevIndex - 1));
  };

  if (isLoading) {
    return (
      <Spin tip='Loading ' size='large' style={{ paddingTop: "50%" }}>
        <div className='content' />
      </Spin>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const pagesHtml =
    currentItem && currentItem.page_content ? JSON.parse(currentItem.page_content).pagesHtml : null;

  return (
    <Layout.Content
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
              Lesson {currentIndex} of {courseItems.length}
            </div>
          </div>
          <div className='lesson-header__title'>
            <p>{currentItem?.name}</p>
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
                onClick={previousPageClick}
                {...(currentIndex === 1 ? { disabled: true } : {})}
              >
                <LeftCircleOutlined rev={undefined} /> Prev
              </Button>
            </Col>
            <Col span={10}>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={nextPageClick}
                {...(currentIndex === courseItems.length ? { disabled: true } : {})}
              >
                Next <RightCircleOutlined rev={undefined} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Content>
  );
};
