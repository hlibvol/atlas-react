import { useTranslate, IResourceComponentsProps, useShow, useList } from "@refinedev/core";

import { Card, Space, Row, Col, Grid, Typography, Avatar, Badge } from "antd";
import { MailOutlined, CheckOutlined } from "@ant-design/icons";
import { IRole, IUser } from "interfaces";
import { ABDivider, TagList } from "components/core";
import { Resource } from "services/enums";

const { useBreakpoint } = Grid;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { xl } = useBreakpoint();
  const { queryResult: userQueryResult } = useShow<IUser>();
  const user = userQueryResult.data?.data;
  const { data: roles } = useList<IRole>({
    resource: Resource.ROLE,
  });
  const role = roles?.data.find((role) => role.id === user?.role_id);

  const t = useTranslate();

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Space direction='vertical' style={{ width: "100%", height: "100%" }}>
            <Space direction='vertical' style={{ textAlign: "center", width: "100%" }}>
              <Avatar size={120} src={user?.avatar?.[0].url}></Avatar>
              <Typography.Title level={3}>
                {user?.first_name} {user?.last_name}
              </Typography.Title>
            </Space>
            <Space
              direction='vertical'
              style={{
                width: "100%",
                textAlign: xl ? "unset" : "center",
              }}
            >
              <Typography.Text>
                <MailOutlined rev={undefined} /> {user?.email}
              </Typography.Text>
              <Typography.Text>
                {"Active: "}
                <CheckOutlined rev={undefined} />{" "}
                <Badge className='site-badge-count-109' style={{ backgroundColor: "#52c41a" }}>
                  {user?.is_active
                    ? t("users.fields.is_active.true")
                    : t("users.fields.is_active.false")}
                </Badge>
              </Typography.Text>
            </Space>
          </Space>
        </Card>
      </Col>

      <Col xl={18} xs={24}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Space direction='vertical' style={{ width: "100%", height: "100%" }}>
            <Space
              direction='vertical'
              style={{
                width: "100%",
                textAlign: xl ? "unset" : "center",
              }}
            >
              <Typography.Text>
                {user?.is_designer ? (
                  <Badge.Ribbon text={t("users.fields.is_designer.true")}>
                    <Card title={t("users.fields.is_designer.label")} size='small'></Card>
                  </Badge.Ribbon>
                ) : (
                  <Badge.Ribbon text={t("users.fields.is_designer.false")} color='red'>
                    <Card title={t("users.fields.is_designer.label")} size='small'></Card>
                  </Badge.Ribbon>
                )}
              </Typography.Text>

              <Typography.Text>
                {user?.is_superuser ? (
                  <Badge.Ribbon text={t("users.fields.is_superuser.true")}>
                    <Card title={t("users.fields.is_superuser.label")} size='small'></Card>
                  </Badge.Ribbon>
                ) : (
                  <Badge.Ribbon text={t("users.fields.is_superuser.false")} color='red'>
                    <Card title={t("users.fields.is_superuser.label")} size='small'></Card>
                  </Badge.Ribbon>
                )}
              </Typography.Text>
              <ABDivider>Associated Jobs</ABDivider>
              {role && <TagList resource={Resource.ROLE} records={[role]} />}
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
