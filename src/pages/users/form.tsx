import React from "react";

import { IResourceComponentsProps, BaseRecord, useApiUrl, useTranslate } from "@pankod/refine-core";
import {
  Form,
  Edit,
  Select,
  Upload,
  Input,
  Button,
  SaveButton,
  Steps,
  getValueFromEvent,
  useStepsForm,
  useSelect,
  Typography,
  Space,
  Avatar,
  Row,
  Col,
  InputProps,
  Radio,
} from "@pankod/refine-antd";

import { DrawerForm } from "components/resource/form";
import { Action, Resource } from "services/enums";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { IRole, IUser } from "interfaces";

export const UserForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { action, itemId } = useAppSelector((state) => state.drawer);

  const resource = Resource.USER;
  const apiUrl = useApiUrl();
  const { Text } = Typography;
  const { selectProps: roleSelectProps } = useSelect<IRole>({
    resource: "roles",
    optionLabel: "name",
    optionValue: "id",
    // defaultValue: userData?.store.id,
  });
  const renderFields = (lesson: IUser | BaseRecord) => (
    <>
      <Form.Item label={t("users.fields.first_name")} name='first_name'>
        <Input />
      </Form.Item>
      <Form.Item label={t("users.fields.last_name")} name='last_name'>
        <Input />
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
        <Input />
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
          <Input type='password' placeholder='●●●●●●●●' />
        </Form.Item>
      ) : null}
      <Form.Item
        label={t("users.fields.role")}
        name='role_id'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...roleSelectProps} />
      </Form.Item>
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
    </>
  );
  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
