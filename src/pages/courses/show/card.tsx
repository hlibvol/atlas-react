import {
  Button,
  Col,
  Icons,
  Row,
  Space,
  Tooltip,
  Typography,
} from '@pankod/refine-antd';
import { memo } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const { Text } = Typography;
const style = {
  borderBottom: '1px solid #eee',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'move',
  width: '100%',
};
export const Card = memo(function Card({
  id,
  text,
  itemId,
  moveCard,
  findCard,
  handleClick,
  courseId,
}: any) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }: any) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0 : 1;
  return (
    <>
      <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
        <Row>
          <Col span={8}>
            {itemId ? (
              <Text style={{ margin: 0 }}>
                <Icons.UnorderedListOutlined />
                &nbsp;&nbsp;{text}
              </Text>
            ) : (
              <Text strong style={{ margin: 0, fontSize: '12px' }}>
                <Icons.UnorderedListOutlined />
                &nbsp;&nbsp;{text}
              </Text>
            )}
          </Col>
          <Col span={8} offset={8}>
            <Space>
              {itemId ? (
                <>
                  <Button type="primary" size="small">
                    <a href={`../../lessons/show/${itemId}`}>Design</a>
                  </Button>
                  <Tooltip title="Remove">
                    <Button
                      shape="circle"
                      size="small"
                      onClick={() => {
                        handleClick(id);
                      }}
                      icon={<Icons.DeleteOutlined />}
                    />
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Remove">
                  <Button
                    shape="circle"
                    size="small"
                    style={{ marginLeft: '73px' }}
                    onClick={() => {
                      handleClick(id);
                    }}
                    icon={<Icons.DeleteOutlined />}
                  />
                </Tooltip>
              )}
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
});
