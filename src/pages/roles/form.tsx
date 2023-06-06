import { BaseRecord, IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Resource, Action } from "services/enums";
import { DrawerForm } from "components/Resource/form";
import { IRole } from "interfaces";
import { Col, Form, Input, Row } from "antd";
import { useAppSelector } from "redux/hooks";
import { SelectResource } from "components/Resource/select";

export const RoleForm: React.FC<IResourceComponentsProps> = () => {
  const { itemId, action } = useAppSelector((state) => state.drawer);
  const t = useTranslate();
  const resource = Resource.ROLE;

  const renderFields = (jobRole: IRole | BaseRecord) => (
    <>
      <SelectResource resource={Resource.JOB} name='job_ids' isMulti />

      <SelectResource resource={Resource.USE_CASE} name='use_case_ids' isMulti />

      <SelectResource resource={Resource.PLAYBOOK} name='playbook_ids' isMulti />

      {itemId && action === Action.EDIT ? (
        <Row>
          <Col span={11}>
            <Form.Item label={t("roles.fields.updated_by_user")} name='updated_by'>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item label={t("roles.fields.created_by_user")} name='created_by'>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Col span={11}>
          <Form.Item label={t("roles.fields.created_by_user")} name='created_by'>
            <Input placeholder='Created By' disabled value={jobRole.created_by} />
          </Form.Item>
        </Col>
      )}
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
