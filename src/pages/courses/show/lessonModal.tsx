import {
  Button,
  Col,
  Icons,
  Modal,
  Select,
  Typography,
} from '@pankod/refine-antd';
import { useState } from 'react';
import { useList, useTranslate } from '@pankod/refine-core';
import { ILesson } from 'interfaces';
const { Text, Title } = Typography;

export const LessonModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const t = useTranslate();
  const showCreateModal = () => {
    setIsModalVisible(true);
  };

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
  lessonListQueryResult.data?.data.map(function (val, index) {
    const value = val.name;
    if (val.is_template) {
      options.push({
        label: value,
        value,
      });
    }
  });

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Col span={3} offset={1}>
        <Button
          shape="circle"
          size="large"
          onClick={() => showCreateModal()}
          icon={<Icons.PlusCircleFilled />}
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

            <Button type="primary" key="next">
              Save
            </Button>,
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </Modal>
      </Col>
    </>
  );
};
