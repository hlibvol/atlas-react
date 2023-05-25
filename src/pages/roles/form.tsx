import { BaseRecord, IResourceComponentsProps, useOne, useTranslate } from "@pankod/refine-core";
import { Resource, Action } from "services/enums";
import { DrawerForm } from "components/Resource/form";
import { IJob, IPlayBook, IUseCase, IRole } from "interfaces";
import { Col, Form, Input, Row, Select, useSelect } from "@pankod/refine-antd";
import { useAppSelector } from "redux/hooks";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const { itemId, activeField, action } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.ROLE;

  const { data } = useOne<IRole>({
    resource: Resource.ROLE,
    id: Number(itemId),
  });

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

      {itemId && action === Action.EDIT ? (
        <Row>
          <Col span={11}>
            <Form.Item label={t("programs.fields.updated-by")} name='updated_by'>
              <Input placeholder='Updated By' disabled value={jobRole.updated_by} />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item label={t("programs.fields.created-by")} name='created_by'>
              <Input placeholder='Created By' disabled value={jobRole.created_by} />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Col span={11}>
          <Form.Item label={t("programs.fields.created-by")} name='created_by'>
            <Input placeholder='Created By' disabled value={jobRole.created_by} />
          </Form.Item>
        </Col>
      )}
    </>
  );
  return (
    <DrawerForm resource={resource} isExternal={data?.data.source_id} renderFields={renderFields} />
  );
};
