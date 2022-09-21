import { Row, Col, Card, Typography } from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col md={24}>
        <Row gutter={[16, 16]}>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{
                padding: 10,
                paddingBottom: 0,
              }}
              style={{
                background: "url(images/daily-revenue.png)",
                backgroundColor: "#3a233c",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
              }}
            >
              {/* <DailyRevenue /> */}
            </Card>
          </Col>
          <Col xl={7} lg={12} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{
                padding: 10,
                paddingBottom: 0,
              }}
              style={{
                background: "url(images/daily-order.png)",
                backgroundColor: "#332a4b",
                backgroundRepeat: "no-repeat",
              }}
            ></Card>
          </Col>
          <Col xl={7} lg={12} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{
                padding: 10,
                paddingBottom: 0,
              }}
              style={{
                background: "url(images/new-orders.png)",
                backgroundColor: "#3d335b",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
              }}
            ></Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
