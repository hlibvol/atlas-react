import {
  Typography,
  Avatar,
  Space,
  NumberField,
  useSimpleList,
  AntdList,
} from "@pankod/refine-antd";
import "./style.less";

import { IUser } from "interfaces";

const { Text } = Typography;

export const TrendingMenu: React.FC = () => {
  const { listProps } = useSimpleList<IUser>({
    resource: "users",
    pagination: { pageSize: 5 },
    syncWithLocation: false,
  });

  return (
    <AntdList
      {...listProps}
      pagination={false}
      renderItem={(item, index) => <MenuItem item={item} index={index} />}
    ></AntdList>
  );
};

const MenuItem: React.FC<{ item: IUser; index: number }> = ({
  item,
  index,
}) => (
  <div className="menu-item" key={item.id}>
    <Space size="large">
      <div className="menu-item__avatar">
        <Avatar
          size={{
            xs: 64,
            sm: 64,
            md: 64,
            lg: 108,
            xl: 132,
            xxl: 108,
          }}
          src=""
        />
        <div className="menu-item__avatar-circle">
          <span>#{index + 1}</span>
        </div>
      </div>
      <div className="menu-item__text">
        <Text strong>{item.first_name}</Text>
      </div>
    </Space>
  </div>
);
