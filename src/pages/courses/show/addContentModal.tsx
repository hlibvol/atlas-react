import { Avatar, Button, Col, Row, Divider, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { BaseKey, useList, useOne, useShow, useTranslate, useUpdate } from "@refinedev/core";
import { ICourse, ILesson } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import { useDesignerEdit } from "hooks/common";
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

  // rowSelection object indicates the need for row selection radio button
  const [selectedLessonData, setSelectedLessonData] = useState([] as Array<ILessonData>);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ILessonData[]) => {
      setSelectedLessonData(selectedRows);
    },
  };

  const selectedLessonFullData = useOne<ILesson>({
    resource: Resource.LESSON,
    id: selectedLessonData[0]?.key || "",
  });

  useEffect(() => {
    if (course && course.items != courseItems) {
      setCourseItems(course.items); // This will always use latest value of count
    }
  }, [course?.items]);

  // Lesson data comes from ILesson Interface
  const lessonListQueryResult = useList<ILessonData>({
    resource: Resource.LESSON,
  });
  // Compare and get unique data from both API
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

  // handle code when page_content updated from one lesson to another
  const [selectionType] = useState<"radio">("radio");
  const { edit, editUrl } = useDesignerEdit(Resource.LESSON, itemId);

  const handleSubmit = async (id: any) => {
    mutate(
      {
        resource: Resource.LESSON,
        id: id || "",
        values: { page_content: selectedLessonFullData?.data?.data?.page_content },
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
          onCancel={() => setIsModalVisible(false)}
        >
          <Row justify='space-between'>
            <Col>
              <Button size='middle'>
                <a href={editUrl}>{t("buttons.blank-lesson")}</a>
              </Button>
            </Col>
            <Col>
              {/* <Button size='middle'>
                <a href='#'>{t("buttons.blank-quiz")}</a>
              </Button> */}
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
