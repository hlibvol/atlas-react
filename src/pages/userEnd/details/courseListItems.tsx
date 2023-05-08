import { Progress, Typography } from "@pankod/refine-antd";
import { memo } from "react";
import { useTranslate } from "@pankod/refine-core";
import { AlignLeftOutlined, Loading3QuartersOutlined } from "@ant-design/icons";
import { List } from "antd";
import { Link } from "@pankod/refine-react-router-v6";
import "./styles.scss";
const { Text } = Typography;

export const CourseListItems = memo(function CourseListItems({ itemId, courseItems }: any) {
  const t = useTranslate();

  return (
    <>
      <List
        size='large'
        dataSource={courseItems}
        renderItem={(item: any) => (
          <List.Item>
            {item.item_id ? (
              <Link to={`learn-course/${item.item_id}`}>
                <Text key={itemId} className='learn-course-title'>
                  <AlignLeftOutlined />
                  &nbsp;&nbsp;{item.item_title}
                </Text>
              </Link>
            ) : (
              <h2 key={item.item_id} className='section-title'>
                {item.item_title}
              </h2>
            )}
            {item.item_id !== 0 && <Loading3QuartersOutlined className='loading-icon' />}
          </List.Item>
        )}
      />
    </>
  );
});
