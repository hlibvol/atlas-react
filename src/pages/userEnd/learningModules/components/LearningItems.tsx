import { AntdLayout, Divider } from "@pankod/refine-antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Link } from "@pankod/refine-react-router-v6";
import { Menu } from "antd";
import { BackButton } from "components/UserEnd/BackButton";
const { SubMenu } = Menu;

interface IToggleProps {
  collapsed: boolean;
  courseItems: Array<any>;
  courseId: number;
}
export const LearningItems: React.FC<IToggleProps> = ({ collapsed, courseItems, courseId }) => {
  return (
    <AntdLayout.Sider
      className='learning-module-sider'
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className='logo' style={{ backgroundColor: "#fff" }}>
        <BackButton />
      </div>
      <Menu theme='light' mode='inline' className='learning-module-menu'>
        {courseItems &&
          courseItems.map((item: any) => (
            <>
              {item.item_id ? (
                <Menu.Item key={item.id} className='learning-module-menu-items'>
                  <Link to={`/learning/course/${courseId}/learn-course/${item.item_id}`}>
                    <AlignLeftOutlined />
                    <span className='nav-text'>{item.item_title}</span>
                  </Link>
                </Menu.Item>
              ) : (
                <>
                  <SubMenu
                    key={item.id}
                    title={<span>{item.item_title}</span>}
                    className='submenu-section'
                  ></SubMenu>
                  <Divider className='divider-section' />
                </>
              )}
            </>
          ))}
      </Menu>
    </AntdLayout.Sider>
  );
};
