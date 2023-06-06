import React from "react";

import { IResourceComponentsProps, BaseRecord, useTranslate } from "@refinedev/core";
import { Form, Input, Row, Col, Radio, Tag } from "antd";

import { DrawerForm } from "components/Resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { IUser } from "interfaces";
import { SelectResource } from "components/Resource/select";

export const UserForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.USER;

  const renderFields = (UserRecord: IUser | BaseRecord) => (
    <>
      <Form.Item label={t("users.fields.first_name")} name='first_name'>
        <Input {...(UserRecord.source_id ? { disabled: true } : null)} />
      </Form.Item>
      <Form.Item label={t("users.fields.last_name")} name='last_name'>
        <Input {...(UserRecord.source_id ? { disabled: true } : null)} />
      </Form.Item>
      <Form.Item
        label={t("users.fields.email")}
        name='email'
        rules={[
          {
            required: true,
            type: "email",
          },
        ]}
      >
        <Input {...(UserRecord.source_id ? { disabled: true } : null)} />
      </Form.Item>
      {action === "create" ? (
        <Form.Item
          label={t("users.fields.password")}
          name='password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type='password'
            placeholder='●●●●●●●●'
            {...(UserRecord.source_id ? { disabled: true } : null)}
          />
        </Form.Item>
      ) : null}
      <SelectResource resource={Resource.ROLE} name='role_id' required />
      <SelectResource resource={Resource.COST_CENTER} name='cost_center_id' required />
      <Row key='relations' gutter={20}>
        <Col xs={12} lg={12}>
          <Form.Item
            label={t("users.fields.is_superuser.label")}
            name='is_superuser'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>{t("users.fields.is_superuser.true")}</Radio>
              <Radio value={false}>{t("users.fields.is_superuser.false")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={12} lg={12}>
          <Form.Item
            label={t("users.fields.is_designer.label")}
            name='is_designer'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>{t("users.fields.is_designer.true")}</Radio>
              <Radio value={false}>{t("users.fields.is_designer.false")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      {itemId && action === Action.EDIT ? (
        <>
          <Row>
            <Col span={11}>
              <Form.Item label={t("users.fields.updated_by_user")} name='updated_by_user'>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label={t("users.fields.created_by_user")} name='created_by_user'>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <h4 style={{ fontWeight: "bold" }}>Active Status</h4>
          {UserRecord.is_active ? (
            <Tag color='#87d068'>Active</Tag>
          ) : (
            <Tag color='#f50'>Inactive</Tag>
          )}
        </>
      ) : (
        <Col span={11}>
          <Form.Item label={t("users.fields.created_by_user")} name='created_by_user'>
            <Input disabled />
          </Form.Item>
        </Col>
      )}
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
