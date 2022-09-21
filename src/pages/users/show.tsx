import {
  useTranslate,
  IResourceComponentsProps,
  useShow,
  useNavigation,
  HttpError,
} from "@pankod/refine-core";

import {
  List,
  Table,
  useTable,
  Card,
  Icons,
  Button,
  Space,
  Row,
  Col,
  Grid,
  Typography,
  Rate,
  Avatar,
} from "@pankod/refine-antd";

import { IUser, IRole } from "interfaces";

const { useBreakpoint } = Grid;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { xl } = useBreakpoint();
  const { queryResult: userQueryResult } = useShow<IUser>();
  const user = userQueryResult.data?.data;

  const { tableProps } = useTable<IRole>({
    resource: "roles",
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    initialPageSize: 4,
    queryOptions: {
      enabled: user !== undefined,
    },
    syncWithLocation: false,
  });

  const t = useTranslate();
  const { show } = useNavigation();

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Space direction="vertical" style={{ width: "100%", height: "100%" }}>
            <Space
              direction="vertical"
              style={{ textAlign: "center", width: "100%" }}
            >
              <Avatar size={120} src={user?.avatar?.[0].url}></Avatar>
              <Typography.Title level={3}>
                {user?.first_name} {user?.last_name}
              </Typography.Title>
            </Space>
            <Space
              direction="vertical"
              style={{
                width: "100%",
                textAlign: xl ? "unset" : "center",
              }}
            >
              <Typography.Text>
                <Icons.MailOutlined /> {user?.email}
              </Typography.Text>
              <Typography.Text>
                <Icons.HomeOutlined /> {user?.address}
              </Typography.Text>
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
