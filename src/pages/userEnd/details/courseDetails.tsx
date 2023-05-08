import React, { useState } from "react";
import { AntdLayout, Col, Row, Spin, Typography } from "@pankod/refine-antd";
import { UserEndHeader } from "components/UserEnd/Header";
import { useParams } from "react-router-dom";
import { useShow } from "@pankod/refine-core";
import { ICourse } from "interfaces";
import { Resource } from "services/enums";
import { CourseListItems } from "./courseListItems";
import "./styles.scss";
import { Banner } from "./components/Banner";
import { BackButton } from "components/UserEnd/BackButton";

export const UserEndCourseDetails: React.FC = () => {
  const { itemId } = useParams<{ itemId: any }>();
  const { queryResult } = useShow<ICourse>({ resource: Resource.COURSE, id: itemId });
  const { data, isLoading, isError } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState([]) as Array<any>;

  if (isLoading) {
    return (
      <Spin tip='Loading Content' size='large' style={{ paddingTop: "50%" }}>
        <div className='content' />
      </Spin>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const date = course?.created_at ? course?.created_at : course?.updated_at;
  const published_date = new Date(date).toDateString();
  // useEffect(() => {
  if (course && course.items != courseItems) {
    const sortedArray = course.items.sort((a: any, b: any) => {
      return a.item_order - b.item_order;
    });
    setCourseItems(sortedArray);
  }
  // }, [course?.items]);

  const courseItemsCountData = course?.items.filter((lesson) => lesson.item_id !== 0);

  const lessonCount = courseItemsCountData?.length;

  const singleLearningRecord = courseItemsCountData?.slice(0, 1)[0];

  const singleLearningRecordId = singleLearningRecord?.item_id;

  return (
    <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <AntdLayout>
        <UserEndHeader />
        <AntdLayout.Content>
          <div style={{ minHeight: 360 }}>
            <BackButton />
            <Banner course={course} singleLearningRecordId={singleLearningRecordId} />
            <div style={{ padding: 30 }}>
              <Row>
                <Col span={20} offset={3}>
                  <Row>
                    <Col span={16}>
                      <Typography.Text>Published {published_date}</Typography.Text>
                      <div className='description'>
                        <div dangerouslySetInnerHTML={{ __html: course?.description ?? "" }} />
                        <p>Click on the Start Course button when you’re ready to begin.</p>
                      </div>
                      <CourseListItems courseItems={courseItems} />
                    </Col>
                    <Col span={8}>
                      <ul
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          listStyle: "none",
                        }}
                      >
                        <li>
                          <Typography.Text strong>{lessonCount} Lesson</Typography.Text>
                        </li>
                        <li>
                          <Typography.Text style={{ paddingLeft: "1rem" }}>
                            {course?.duration} Minutes
                          </Typography.Text>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
};
