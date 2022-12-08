import update from 'immutability-helper';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { CourseItem } from './courseItem';
import { ItemTypes } from './ItemTypes';
import { Col, Input, message, Row, Typography } from '@pankod/refine-antd';
import { useShow, useUpdate } from '@pankod/refine-core';
import { ICourse } from 'interfaces';
const { Text, Title } = Typography;

const style = {
  width: 1000,
};

export const Container: React.FC = memo(function Container() {
  const { mutate } = useUpdate();
  const { queryResult } = useShow<ICourse>();
  const { data, isLoading } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState([]) as Array<any>;

  useEffect(() => {
    if (course && course.items != courseItems) {
      setCourseItems(course.items);
    }
  }, [course?.items]);

  const findCourseItem = useCallback(
    (id: string) => {
      const courseItem = courseItems.filter((c: any) => `${c.id}` === id)[0];
      return {
        courseItem,
        index: courseItems.indexOf(courseItem),
      };
    },
    [courseItems]
  );
  const moveCourseItem = useCallback(
    (id: string, atIndex: number) => {
      const { courseItem, index } = findCourseItem(id);
      setCourseItems(
        update(courseItems, {
          $splice: [
            [index, 1],
            [atIndex, 0, courseItem],
          ],
        })
      );
    },
    [findCourseItem, courseItems, setCourseItems]
  );

  const [inputData, setInputData] = useState({
    name: '',
    type: '',
  }) as Array<any>;

  const { name, type } = inputData;

  const updateCourse = (items: any, message: any | undefined) => {
    mutate(
      {
        resource: 'courses',
        id: course?.id || '',
        values: { items: items },
        mutationMode: 'optimistic',
      },
      {
        onError: (error, variables, context) => {
          console.log('data error', data);
        },
        onSuccess: (data, variables, error) => {
          setCourseItems(data.data.items);
          message;
          setInputData('');
        },
      }
    );
  };

  const handledOnchangeLesson = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handledOnKeyDownLesson = (e: any) => {
    if (name) {
      if (e.keyCode == 13) {
        courseItems.push({
          item_title: name,
          item_type: e.shiftKey ? 'SECTION' : 'LESSON',
          item_id: 0,
          item_order: courseItems.length,
        });
        message.success('Item Added');
        updateCourse(courseItems, message);
      }
    }
  };

  const removeItemOnClick = (id: any) => {
    const itemsid = parseInt(id);
    const removedItemData = courseItems.filter((item: any) => item.id !== itemsid);
    message.success('Item Removed');
    updateCourse(removedItemData, message);
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.COURSEITEM }));
  return (
    <div ref={drop} style={style}>
      {courseItems.map((courseItem: any, index: number) => (
        <CourseItem
          key={courseItem.id}
          id={`${courseItem.id}`}
          text={courseItem.item_title}
          itemId={courseItem.item_id}
          index={index}
          moveCourseItem={moveCourseItem}
          findCourseItem={findCourseItem}
          handleClick={removeItemOnClick}
          isLoading={isLoading}
        />
      ))}
      <Row>
        <Col span={11} xs={6} lg={18} style={{ marginTop: 10 }}>
          <Input
            placeholder='Add new Lesson or Quiz...'
            name='name'
            value={name || ''}
            onChange={(e) => {
              handledOnchangeLesson(e);
            }}
            onKeyDown={(e) => {
              handledOnKeyDownLesson(e);
            }}
          />
        </Col>
        <Col span={10} offset={13}>
          <Text type='secondary'>Shift + Enter to add as a section</Text>
        </Col>
      </Row>
    </div>
  );
});
