import { Button, Col, Row, Space, Typography, Popconfirm } from "antd";
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { AddContentModal } from "./addContentModal";
import { useOne, useTranslate } from "@refinedev/core";
import { ILesson } from "interfaces";
import { Resource } from "services/enums";

const { Text } = Typography;
const style = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  cursor: "move",
  // width: "100%",
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
  const t = useTranslate();
  const styleCourse = {
    display: "flex",
    justifyContent: "end",
  };
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

  const lessonData =
    itemId &&
    useOne<ILesson>({
      resource: Resource.LESSON,
      id: itemId,
    });

  // const { editUrl } = useEdit(Resource.LESSON, itemId, 2);
  const editUrl = `/editor/${Resource.LESSON}/${itemId}`;

  useEffect(() => {
    setPageContent(lessonData.data?.data.page_content);
  }, [lessonData.data?.data.page_content]);

  return (
    <>
      <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
        <Row>
          <Col span={12}>
            {itemId ? (
              <Text style={{ margin: 0 }} key={itemId}>
                <UnorderedListOutlined rev={undefined} />
                &nbsp;&nbsp;{itemTitle}
              </Text>
            ) : (
              <Text strong style={{ margin: 0, fontSize: "12px", marginLeft: "15px" }} key={itemId}>
                &nbsp;&nbsp;{itemTitle}
              </Text>
            )}
          </Col>
          <Col span={12} style={styleCourse}>
            <Space>
              {itemId ? (
                <>
                  <div>
                    {pagecontent ? (
                      <Button type='primary' size='small' style={{ width: "105px" }}>
                        <a href={editUrl} target='_blank' rel='noreferrer'>
                          {t("buttons.design")}
                        </a>
                      </Button>
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
                    <Button
                      shape='circle'
                      size='small'
                      icon={<DeleteOutlined rev={undefined} />}
                      danger
                    />
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
                    icon={<DeleteOutlined rev={undefined} />}
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
