import { IResourceComponentsProps, useList, useTranslate } from "@refinedev/core";
import { Resource } from "services/enums";
import List from "components/Resource/list";
import { IAssessment } from "interfaces";
import { TagField } from "@refinedev/antd";

export const DimensionList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: assessments } = useList<IAssessment>({ resource: Resource.ASSESSMENT });
  const columns = [
    {
      dataIndex: ["assessment_id"],
      title: t("dimensions.fields.assessment_id"),
      render: (assessmentId: number) => {
        const assessment = assessments?.data.find((item) => item.id === assessmentId);
        return (
          <TagField
            color={assessment ? "#8c8c8c" : "red"}
            value={assessment ? assessment.name : "No Assessment"}
          />
        );
      },
    },
  ];
  return <List resource={Resource.DIMENSION} columns={columns} />;
};
