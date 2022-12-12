import { Button, Col, Icons, Row, Space, Typography, Popconfirm } from "@pankod/refine-antd";
import { memo, useEffect, useState } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { AddContentModal } from "./addContentModal";
import { useOne } from "@pankod/refine-core";
import { ILesson } from "interfaces";
import { DesignerButton } from "components/designer/designerButton";
const { Text } = Typography;
const style = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  cursor: "move",
  width: "100%",
};
export const CourseItem = memo(function CourseItem({
  id,
  itemTitle,
  itemId,
  courseType,
  moveCourseItem,
  findCourseItem,
  handleClick,
}: any) {
  const originalIndex = findCourseItem(id).index;
  const [pagecontent, setPageContent] = useState([]) as Array<any>;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COURSEITEM,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCourseItem(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCourseItem]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.COURSEITEM,
      hover({ id: draggedId }: any) {
        if (draggedId !== id) {
          const { index: overIndex } = findCourseItem(id);
          moveCourseItem(draggedId, overIndex);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      drop(item: any, monitor: DropTargetMonitor) {},
    }),
    [findCourseItem, moveCourseItem]
  );
  const opacity = isDragging ? 0 : 1;

  const lessonData = useOne<ILesson>({
    resource: "lessons",
    id: itemId,
  });

  useEffect(() => {
    setPageContent(lessonData.data?.data.page_content);
  }, [lessonData.data?.data.page_content]);

  return (
    <>
      <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
        <Row>
          <Col span={8}>
            {itemId ? (
              <Text style={{ margin: 0 }} key={itemId}>
                <Icons.UnorderedListOutlined />
                &nbsp;&nbsp;{itemTitle}
              </Text>
            ) : (
              <Text strong style={{ margin: 0, fontSize: "12px", marginLeft: "15px" }} key={itemId}>
                &nbsp;&nbsp;{itemTitle}
              </Text>
            )}
          </Col>
          <Col span={8} offset={8}>
            <Space>
              {itemId ? (
                <>
                  <div>
                    {pagecontent ? (
                      <DesignerButton itemId={itemId} />
                    ) : (
                      <AddContentModal
                        courseType={courseType}
                        itemId={itemId}
                        itemTitle={itemTitle}
                        key={id}
                      />
                    )}
                  </div>
                  <Popconfirm
                    key='delete'
                    okText='Delete'
                    cancelText='Cancel'
                    okType='danger'
                    onConfirm={(): void => {
                      handleClick(id);
                    }}
                    title='Are you sure?'
                  >
                    <Button shape='circle' size='small' icon={<Icons.DeleteOutlined />} danger />
                  </Popconfirm>
                </>
              ) : (
                <Popconfirm
                  key='delete'
                  okText='Delete'
                  cancelText='Cancel'
                  okType='danger'
                  onConfirm={(): void => {
                    handleClick(id);
                  }}
                  title='Are you sure?'
                >
                  <Button
                    shape='circle'
                    size='small'
                    style={{ marginLeft: "73px" }}
                    icon={<Icons.DeleteOutlined />}
                    danger
                  />
                </Popconfirm>
              )}
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
});
