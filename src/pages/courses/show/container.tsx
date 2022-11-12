import update from 'immutability-helper';
import { memo, useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useDrop } from 'react-dnd';
import { Config } from 'services/config';
import { TOKEN_KEY } from 'services/constants';
import { Card } from './card';
import { ItemTypes } from './ItemTypes';
import {
  Button,
  Col,
  Icons,
  Input,
  message,
  Row,
  Typography,
} from '@pankod/refine-antd';
import { useShow } from '@pankod/refine-core';
import { ICourse } from 'interfaces';
import { LessonModal } from './lessonModal';
const { Text, Title } = Typography;

const style = {
  width: 1000,
};

const token = localStorage.getItem(TOKEN_KEY);

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface IfirstChildProps {
  courseid?: number;
}

export const Container: React.FC<IfirstChildProps> = memo(function Container({
  courseid,
}) {
  const { queryResult } = useShow<ICourse>();
  const { data, isLoading } = queryResult;
  const record = data?.data.items;
  const [cards, setCards] = useState(record) as Array<any>;

  const designEndpoint = `${Config.apiEndpoint}/v1/courses/${courseid}`;

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c: any) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );
  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const [item, setItem] = useState({
    name: '',
    type: '',
  }) as Array<any>;

  const { name, type } = item;

  const updateCourse = async (items: any, message: any | undefined) => {
    try {
      const updatelesson = await axios.put(`${designEndpoint}`, {
        items: items,
      });
      setCards(updatelesson.data.items);
      message;
      setItem('');
    } catch (error) {}
  };

  const handledOnchangeLesson = (e: any) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handledOnKeyDownLesson = (e: any) => {
    if (name) {
      if (e.keyCode == 13) {
        cards.push({
          item_title: name,
          item_type: e.shiftKey ? 'SECTION' : 'LESSON',
          item_id: 0,
          item_order: 0,
        });
        message.success('Item Added');
        updateCourse(cards, message);
      }
    }
  };

  const removeItemOnClick = (id: any) => {
    const itemsid = parseInt(id);
    const removedItemData = cards.filter((item: any) => item.id !== itemsid);
    message.success('Item Removed');
    updateCourse(removedItemData, message);
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (
    <div ref={drop} style={style}>
      {cards.map((card: any) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.item_title}
          itemId={card.item_id}
          moveCard={moveCard}
          findCard={findCard}
          handleClick={removeItemOnClick}
          courseId={card.course_id}
        />
      ))}
      <Row>
        <Col span={6} xs={6} lg={14} style={{ marginTop: 10 }}>
          <Input
            placeholder="Create or add new lesson here..."
            name="name"
            value={name || ''}
            onChange={(e) => {
              handledOnchangeLesson(e);
            }}
            onKeyDown={(e) => {
              handledOnKeyDownLesson(e);
            }}
          />
        </Col>
        <LessonModal />
        <Col span={8} offset={8}>
          <Text type="secondary">Shift + Enter to add as a section</Text>
        </Col>
      </Row>
    </div>
  );
});
