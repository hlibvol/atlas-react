import { Avatar, Card, Col, Row, Typography } from "@pankod/refine-antd";
import { Link } from "@pankod/refine-react-router-v6";
interface Props {
  course: any;
}
export const Banner: React.FC<Props> = ({ course }) => {
  return (
    <Card>
      <Row>
        <Col span={24}>
          <div style={{ padding: "5%", marginLeft: "15%" }}>
            <Avatar className='avatar-demo'>AB</Avatar>
            <Typography.Title level={3} style={{ marginTop: 20 }}>
              {course?.name}
            </Typography.Title>
            <div className='btn-action-wrapper'>
              <Link className='btn-action-link' to='#'>
                <Typography.Text className='btn-action-link-text'>START COURSE</Typography.Text>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
