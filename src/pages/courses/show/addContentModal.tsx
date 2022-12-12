import { Avatar, Button, Col, Divider, Modal, Space, Table, Tag } from "@pankod/refine-antd";
import { useEffect, useState } from "react";
import { useList, useShow, useTranslate, useUpdate } from "@pankod/refine-core";
import { ICourse, ILesson, TableParams } from "interfaces";
import type { ColumnsType } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

// Interface for props from courseItem component
interface IUpdateLessonProps {
  courseType: any;
  itemId: any;
  itemTitle: any;
}

// column data when popup open on design button click
const columns: ColumnsType<ILesson> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (type) => (
      <>
        <Tag color='geekblue'>{type.toUpperCase()}</Tag>
      </>
    ),
    filters: [
      { text: "LESSON", value: "LESSON" },
      { text: "QUIZ", value: "QUIZ" },
    ],
  },
];

// rowSelection object indicates the need for row selection radio button
let selectedLessonData = Array();
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ILesson[]) => {
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
  const { data, isLoading } = queryResult;
  const course = data?.data;
  const [courseItems, setCourseItems] = useState(course?.items || []) as Array<any>;
  const t = useTranslate();

  // For type filter
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (
    filters: Record<string, FilterValue>,
    sorter: SorterResult<ILesson>
  ) => {
    setTableParams({
      filters,
      ...sorter,
    });
  };

  // Show modal
  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  // Course Item data comes from Icourses Interface

  useEffect(() => {
    if (course && course.items != courseItems) {
      setCourseItems(course.items); // This will always use latest value of count
    }
  }, [course?.items]);

  // Lesson data comes from ILesson Interface
  const lessonListQueryResult = useList<ILesson>({
    resource: "lessons",
  });
  // comapre and get unique data from both API
  const options = Array();

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
  const [selectionType, setSelectionType] = useState<"radio">("radio");

  const navigate = useNavigate();
  const handleSubmit = async (id: any) => {
    mutate(
      {
        resource: "lessons",
        id: id || "",
        values: { page_content: selectedLessonData[0]?.page_content },
        mutationMode: "optimistic",
      },
      {
        onError: (error, variables, context) => {
          console.log("data error", data);
        },
        onSuccess: (data, variables, error) => {
          // setIsModalVisible(false);
          navigate(`/lessons/show/${itemId}`);
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
          <Col xs={0} sm={12} lg={18}>
            <Space size={[30, 40]} wrap>
              <Button color='geekblue' size='middle'>
                <a href={`../../lessons/show/${itemId}`}>{t("buttons.blank-lesson")}</a>
              </Button>
              <Button color='geekblue' size='middle'>
                <a href='#'>{t("buttons.blank-quiz")}</a>
              </Button>
            </Space>
          </Col>
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
              onChange={() => handleTableChange}
            />
          </div>
        </Modal>
      </Col>
    </>
  );
};
