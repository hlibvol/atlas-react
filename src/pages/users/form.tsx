import React from "react";

import { IResourceComponentsProps, BaseRecord, useTranslate } from "@refinedev/core";
import { Form, Input, Row, Col, Radio } from "antd";

import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { IUser } from "interfaces";
import { SelectResource } from "components/Resource/select";

export const UserForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action } = useAppSelector((state) => state.drawer);
  const resource = Resource.USER;

  const renderFields = (user: IUser | BaseRecord) => {
    const isExternal = !!user?.source_id;
    return [
      {
        tabKey: "1",
        field: (
          <>
            <Form.Item label={t("users.fields.first_name")} name='first_name'>
              <Input disabled={isExternal} />
            </Form.Item>
            <Form.Item label={t("users.fields.last_name")} name='last_name'>
              <Input disabled={isExternal} />
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
              <Input disabled={isExternal} />
            </Form.Item>
            {action === "create" && (
              <Form.Item
                label={t("users.fields.password")}
                name='password'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type='password' placeholder='●●●●●●●●' />
              </Form.Item>
            )}
            <SelectResource
              resource={Resource.ROLE}
              name='role_id'
              required
              disabled={isExternal}
            />
            <SelectResource
              resource={Resource.COST_CENTER}
              name='cost_center_id'
              required
              disabled={isExternal}
            />
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
                  <Radio.Group disabled={isExternal}>
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
                  <Radio.Group disabled={isExternal}>
                    <Radio value={true}>{t("users.fields.is_designer.true")}</Radio>
                    <Radio value={false}>{t("users.fields.is_designer.false")}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </>
        ),
      },
    ];
  };

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
