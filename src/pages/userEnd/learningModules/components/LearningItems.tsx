import { Layout, Divider, Menu } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BackButton } from "components/UserEnd/BackButton";
import { ICourseItem } from "interfaces";
const { SubMenu } = Menu;

interface IToggleProps {
  collapsed: boolean;
  courseItems: ICourseItem[];
  courseId: number;
}
export const LearningItems: React.FC<IToggleProps> = ({
  collapsed,
  courseItems,
  courseId,
}: IToggleProps) => {
  return (
    <Layout.Sider
      className='learning-module-sider'
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div className='logo' style={{ backgroundColor: "#fff" }}>
        <BackButton itemdetailslink={`/learning/course/${courseId}`} courseId={courseId} />
      </div>
      <Menu theme='light' mode='inline' className='learning-module-menu'>
        {courseItems &&
          courseItems.map((item) => (
            <>
              {item.item_id ? (
                <Menu.Item key={item.id} className='learning-module-menu-items'>
                  <Link to={`/learning/course/${courseId}/learn-course/${item.item_id}`}>
                    <AlignLeftOutlined rev={undefined} />
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
    </Layout.Sider>
  );
};
