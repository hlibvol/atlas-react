import { Avatar, Card, Col, Progress, Row, Typography } from "antd";
import { ICourse } from "interfaces";
import { Link } from "react-router-dom";
interface Props {
  course: ICourse | undefined;
  singleLearningRecordId: number | undefined;
}
export const Banner: React.FC<Props> = ({ course, singleLearningRecordId }: Props) => {
  const status = false;

  return (
    <Card>
      <Row>
        <Col span={16} offset={4}>
          <div style={{ padding: "5%" }}>
            <Avatar className='avatar-demo'>AB</Avatar>
            <Typography.Title level={3} style={{ marginTop: 20 }}>
              {course?.name}
            </Typography.Title>
            {status && <Progress percent={50} status='active' />}
            <div className='btn-action-wrapper'>
              {status ? (
                <Typography.Text className='btn-action-link-text'>Resume Course</Typography.Text>
              ) : (
                <Link className='btn-action-link' to={`learn-course/${singleLearningRecordId}`}>
                  <Typography.Text className='btn-action-link-text'>START COURSE</Typography.Text>
                </Link>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
