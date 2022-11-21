import {
  Button,
  Col,
  Icons,
  message,
  Modal,
  Select,
  Typography,
} from '@pankod/refine-antd';
import { useEffect, useState } from 'react';
import { useList, useShow, useTranslate, useUpdate } from '@pankod/refine-core';
import { ICourse, ILesson } from 'interfaces';
const { Text, Title } = Typography;

interface IUpdateLessonProps {
  updateLesson: any;
}

export const LessonModal: React.FC<IUpdateLessonProps> = ({
  updateLesson,
}: any) => {
  const { mutate } = useUpdate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { queryResult } = useShow<ICourse>();
  const { data, isLoading } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState(
    course?.items || []
  ) as Array<any>;
  const [selectLessons, setSelectLessons] = useState([]);
  const t = useTranslate();
  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (course && course.items != courseItems) {
      setCourseItems(course.items); // This will always use latest value of count
    }
  }, [course?.items]);

  const lessonListQueryResult = useList<ILesson>({
    resource: 'lessons',
    config: {
      filters: [
        {
          field: 'is_template',
          operator: 'eq',
          value: true,
        },
      ],
    },
  });
  const options = Array();

  var uniqueLesson = lessonListQueryResult.data?.data.filter(function (obj) {
    if (obj.is_template) {
      return !courseItems.some(function (obj2: { item_id: number }) {
        return obj.id == obj2.item_id;
      });
    }
  });

  uniqueLesson?.map((ele: any) => {
    const value = ele.name;
    options.push({
      label: value,
      value,
    });
  });

  const handleChange = (e: any) => {
    setSelectLessons(e);
  };

  const handleSubmit = () => {
    selectLessons.map((lessonValue) => {
      let dataTitle = lessonValue;
      courseItems.push({
        item_title: dataTitle,
        item_type: 'LESSON',
        item_id: 0,
        item_order: courseItems.length,
      });
    });

    message.success('Lesson Added');
    updateLesson(courseItems, message);
    setIsModalVisible(false);
  };

  return (
    <>
      <Col span={3} offset={1}>
        <Button
          shape="circle"
          size="large"
          onClick={() => showCreateModal()}
          icon={<Icons.PlusCircleFilled />}
          style={{ marginTop: 5 }}
        />
      </Col>
      <Col span={3} offset={3}>
        <Modal
          title={t('lessons.lessons')}
          visible={isModalVisible}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>,
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={(e) => handleChange(e)}
            options={options}
          />
        </Modal>
      </Col>
    </>
  );
};
