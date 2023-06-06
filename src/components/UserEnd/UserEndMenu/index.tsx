import { Menu } from "antd";

export const UserEndMenu: React.FC = () => {
  return (
    <Menu
      theme='light'
      mode='horizontal'
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: "64px", color: "#000" }}
    >
      <Menu.Item key='1' style={{ color: "#000" }}>
        Courses
      </Menu.Item>
    </Menu>
  );
};
