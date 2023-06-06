import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { Typography } from "antd";

import { IRole } from "interfaces";
import "./style.less";

export const TotalRoles: React.FC = () => {
  const t = useTranslate();
  const API_URL = useApiUrl();

  const url = `${API_URL}/roles`;
  const { data } = useCustom<{
    data: IRole[];
    total: number;
    trend: number;
  }>({ url, method: "get" });

  const { Text, Title } = Typography;

  return (
    <div className='daily-order-wrapper'>
      <div className='title-area'>
        <Title level={3}>{t("dashboard.totalRoles.title")}</Title>
        <div className='title-area__number'>
          <Text strong>{data?.data.total ?? 0} </Text>
        </div>
      </div>
    </div>
  );
};
