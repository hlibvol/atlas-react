import { Card, Col, Row, Spin } from "@pankod/refine-antd";
import bgImg from "../images/course_bg_image.jpg";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "@pankod/refine-react-router-v6";
import { Resource } from "services/enums";
import { ICourse } from "interfaces";
import { useList } from "@pankod/refine-core";
export const UserEndCourseCard: React.FC = () => {
  const { data, isLoading, isError } = useList<ICourse>({
    resource: Resource.COURSE,
  });

  const courses = data?.data ?? [];

  if (isLoading) {
    return (
      <Spin tip='Loading' size='large' style={{ paddingTop: "50%" }}>
        <div className='content' />
      </Spin>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <Row gutter={16}>
      {courses &&
        courses.map((course) => (
          <Col span={4} key={course.id} style={{ paddingTop: "8px" }}>
            <Card bordered={false} cover={<img alt='example' src={bgImg} />}>
              <Card.Meta title={course.name} />
              <Row style={{ marginTop: "8px" }}>
                <Col span={10}>
                  <ClockCircleOutlined /> 1h:40m
                </Col>
                <Col span={12} offset={2}>
                  <Link to={`/learning/course/${course.id}`}>Go To Course</Link>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
    </Row>
  );
};
