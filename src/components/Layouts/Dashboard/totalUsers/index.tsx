import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { Typography } from "antd";

import { IUser } from "interfaces";
import "./style.less";

export const TotalUsers: React.FC = () => {
  const t = useTranslate();
  const API_URL = useApiUrl();

  const url = `${API_URL}/users`;
  const { data } = useCustom<{
    data: IUser[];
    total: number;
    trend: number;
  }>({ url, method: "get" });

  const { Text, Title } = Typography;

  return (
    <div className='new-customers-wrapper'>
      <div className='header'>
        <Title level={3} className='header__title'>
          {t("dashboard.users.title")}
        </Title>

        <div className='header__numbers'>
          <Text strong>{data?.data.total ?? 0}</Text>
        </div>
      </div>
    </div>
  );
};
