import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";
import { DrawerForm } from "components/resource/form";
import { IJob } from "interfaces";
import { Form, Select, useSelect } from "@pankod/refine-antd";
import { useAppSelector } from "redux/hooks";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const { activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.ROLE;

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: "jobs",
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (jobRole: IJob | BaseRecord) => (
    <>
      <Form.Item
        label={t("roles.fields.associatedJob")}
        name='job_ids'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...jobSelectProps} autoFocus={activeField === "job_ids"} />
      </Form.Item>
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
