import { Tag } from "antd";
import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";

import { DrawerForm } from "components/Resource/form";
import { IAssessment, IDimension } from "interfaces";
import { Resource } from "services/enums";

export const AssessmentForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const renderFields = (assessment: IAssessment | BaseRecord) => {
    return [
      {
        tabKey: "2",
        field: (
          <>
            {assessment?.dimensions?.length ? (
              <>
                <h4 style={{ fontWeight: "bold" }}>{t("assessments.fields.dimensions")}</h4>
                {assessment.dimensions?.map((dimension: IDimension) => (
                  <Tag color='default' style={{ fontSize: "13px", margin: "5px", padding: "5px" }}>
                    {dimension.name}
                  </Tag>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        ),
      },
    ];
  };
  return <DrawerForm resource={Resource.ASSESSMENT} renderFields={renderFields} />;
};
