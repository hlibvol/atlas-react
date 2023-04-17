import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Resource } from "services/enums";
import { DrawerForm } from "components/Resource/form";
import { IJob, IPlayBook, IUseCase, IRole } from "interfaces";
import { Form, Select, useSelect } from "@pankod/refine-antd";
import { useAppSelector } from "redux/hooks";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const { activeField } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.ROLE;

  const { selectProps: jobSelectProps } = useSelect<IJob>({
    resource: Resource.JOB,
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: useCaseSelectProps } = useSelect<IUseCase>({
    resource: Resource.USE_CASE,
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: playBookSelectProps } = useSelect<IPlayBook>({
    resource: Resource.PLAYBOOK,
    optionLabel: "name",
    optionValue: "id",
  });

  const renderFields = (jobRole: IRole | BaseRecord) => (
    <>
      <Form.Item label={t("roles.fields.associatedJob")} name='job_ids'>
        <Select
          {...jobSelectProps}
          autoFocus={activeField === "job_ids"}
          placeholder='Select Jobs'
          mode='multiple'
        />
      </Form.Item>

      <Form.Item label={t("roles.fields.associatedUseCases")} name='use_case_ids'>
        <Select
          {...useCaseSelectProps}
          autoFocus={activeField === "use_case_ids"}
          mode='multiple'
          placeholder='Select Use Cases'
        />
      </Form.Item>

      <Form.Item label={t("roles.fields.associatedPlayBook")} name='playbook_ids'>
        <Select
          {...playBookSelectProps}
          autoFocus={activeField === "playbook_ids"}
          mode='multiple'
          placeholder='Select Playbook'
        />
      </Form.Item>
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
