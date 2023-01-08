import { Avatar, Button, Col, Row, Divider, Modal, Space, Table, Tag } from "@pankod/refine-antd";
import { useEffect, useState } from "react";
import { BaseKey, useList, useShow, useTranslate, useUpdate } from "@pankod/refine-core";
import { ICourse, ILesson } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import { useEdit } from "hooks/common";
import { Resource } from "services/enums";

// Interface for props from courseItem component
interface IUpdateLessonProps {
  courseType: any;
  itemId: any;
  itemTitle: any;
}

type ILessonData = Partial<ILesson> & { key: BaseKey; type: any };

// column data when popup open on design button click
const columns: ColumnsType<ILessonData> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (type) => (
      <>
        <Tag color='geekblue'>{type.toUpperCase() + " TEMPLATE"}</Tag>
      </>
    ),
    filters: [
      { text: "LESSON", value: "LESSON" },
      { text: "QUIZ", value: "QUIZ" },
    ],
  },
];

// rowSelection object indicates the need for row selection radio button
let selectedLessonData = [] as Array<ILessonData>;
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ILessonData[]) => {
    selectedLessonData = selectedRows;
  },
};

export const AddContentModal: React.FC<IUpdateLessonProps> = ({
  courseType,
  itemId,
  itemTitle,
}: any) => {
  const { mutate } = useUpdate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { queryResult } = useShow<ICourse>();
  const { data } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState(course?.items || []) as Array<any>;
  const t = useTranslate();

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (course && course.items != courseItems) {
      setCourseItems(course.items); // This will always use latest value of count
    }
  }, [course?.items]);

  // Lesson data comes from ILesson Interface
  const lessonListQueryResult = useList<ILessonData>({
    resource: Resource.LESSON,
  });
  // comapre and get unique data from both API
  const options = [] as Array<ILessonData>;

  // get data after filter array
  lessonListQueryResult.data?.data.map((ele: any) => {
    if (ele.is_template) {
      const value = ele.name;
      options.push({
        key: ele.id,
        name: value,
        type: courseType,
        page_content: ele.page_content,
      });
    }
  });

  // handle code when paage_content updated from one lesson to another
  const [selectionType] = useState<"radio">("radio");
  const { edit, editUrl } = useEdit(Resource.LESSON, itemId, 2);

  const handleSubmit = async (id: any) => {
    mutate(
      {
        resource: Resource.LESSON,
        id: id || "",
        values: { page_content: selectedLessonData[0]?.page_content },
        mutationMode: "pessimistic",
      },
      {
        onError: (error, variables, context) => {
          console.log("data error", data);
        },
        onSuccess: (data, variables, error) => {
          edit();
        },
      }
    );
  };

  return (
    <>
      <Button
        size='small'
        onClick={() => showCreateModal()}
        style={{ backgroundColor: "#213A5F", color: "#fff" }}
        ghost
      >
        {t("buttons.add-content")}
      </Button>
      <Col span={3} offset={3}>
        <Modal
          title={itemTitle}
          visible={isModalVisible}
          footer={[
            <Space>
              <Button key='cancel' onClick={() => setIsModalVisible(false)}>
                {t("buttons.cancel")}
              </Button>
              <Button type='primary' onClick={() => handleSubmit(itemId)}>
                {t("buttons.save")}
              </Button>
            </Space>,
          ]}
        >
          <Row justify='space-between'>
            <Col>
              <Button size='middle'>
                <a href={editUrl}>{t("buttons.blank-lesson")}</a>
              </Button>
            </Col>
            <Col>
              <Button size='middle'>
                <a href='#'>{t("buttons.blank-quiz")}</a>
              </Button>
            </Col>
          </Row>
          <Divider plain>
            <Avatar style={{ backgroundColor: "#87d068", verticalAlign: "middle" }} gap={4}>
              OR
            </Avatar>
          </Divider>
          <div>
            <div style={{ marginBottom: 12 }}></div>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={options}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 240 }}
              size='small'
            />
          </div>
        </Modal>
      </Col>
    </>
  );
};
