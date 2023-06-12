import { TagField } from "@refinedev/antd";
import { BaseRecord, useTranslate } from "@refinedev/core";
import { Row, Col, Typography, Card, Space, Tag } from "antd";
import moment from "moment";
import { Action } from "services/enums";
const { Text } = Typography;

type MainTabProps = {
  record?: BaseRecord;
  mainTabFields?: any;
  action?: Action;
};

export const MainTab: React.FC<MainTabProps> = (props: MainTabProps) => {
  const { record, mainTabFields, action } = props;
  const isExternal = !!record?.source_id;
  const isDeleted = !record?.is_active || (isExternal && record?.is_deleted);
  const t = useTranslate();
  return (
    <Row gutter={16}>
      <Col flex='1 1 200px'>
        <Card bordered={false} style={{ height: "100%", backgroundColor: "#fafafa" }}>
          {mainTabFields}
        </Card>
      </Col>
      {action === Action.EDIT && (
        <Col flex='0 1 300px'>
          <Card bordered={false} style={{ height: "100%", backgroundColor: "#fafafa" }}>
            <Space direction='vertical' size={"middle"}>
              <Space direction='vertical'>
                <Text type='secondary' italic>
                  Created at{isExternal ? " (in AB)" : ""}:{" "}
                  {record?.created_at
                    ? moment(moment.utc(record.created_at).toDate()).local().fromNow()
                    : "Unknown"}
                </Text>
                <Text italic>By: {record?.created_by_user?.name ?? "Unknown"}</Text>
              </Space>
              <Space direction='vertical'>
                <Text type='secondary' italic>
                  Updated at:{" "}
                  {isExternal
                    ? moment(moment.utc(record.source_update_at).toDate()).local().fromNow()
                    : record?.updated_at &&
                      moment(moment.utc(record.updated_at).toDate()).local().fromNow()}
                </Text>
                <Text italic>By: {record?.updated_by ?? "Unknown"}</Text>
              </Space>
              <Space direction='vertical'>
                <TagField
                  color={isExternal ? "cyan" : "green"}
                  value={isExternal ? t("status.external") : t("status.internal")}
                />
              </Space>
              <Space direction='vertical'>
                <TagField
                  color={isDeleted ? "green" : "red"}
                  value={isDeleted ? "Active" : "Deleted"}
                />
              </Space>
            </Space>
          </Card>
        </Col>
      )}
    </Row>
  );
};
