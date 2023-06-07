import React from "react";
import { useAppSelector } from "redux/hooks";
import RichTextEditor from "components/RichTextEditor";
import { Form, Input, Tabs as AntDTabs, Card } from "antd";
import { BaseRecord, useTranslate } from "@refinedev/core";
import { useResources } from "hooks/resource";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IDrawerField } from "interfaces";
import { MainTab } from "./mainTab";

type TabsProps = {
  record?: BaseRecord;
  resource: string;
  fields?: IDrawerField[] | null;
};

export const Tabs: React.FC<TabsProps> = (props) => {
  const { resource, fields, record } = props;
  const isExternal = !!record?.source_id;
  const { activeField, action } = useAppSelector((state) => state.drawer);

  const resources = useResources();
  const { hasDefaultFields, tabs } = resources.find((r) => r.name === resource) || {};
  const t = useTranslate();

  const defaultFormItems = [
    <Form.Item
      key='name'
      label={t(`${resource}.fields.title`)}
      name='name'
      rules={[{ required: true }]}
    >
      <Input
        placeholder={`Enter ${t(`${resource}.fields.title`)}`}
        autoFocus={!activeField}
        tabIndex={1}
        disabled={isExternal}
      />
    </Form.Item>,
    <Form.Item key='description' label={t(`${resource}.fields.description`)} name='description'>
      {/* @ts-ignore */}
      <RichTextEditor
        placeholder={`Enter ${t(`${resource}.fields.description`)}..`}
        autoFocus={activeField === "description"}
        tabIndex={2}
        readOnly={isExternal}
      />
    </Form.Item>,
  ];

  const mainTabFields = (
    <>
      {hasDefaultFields && defaultFormItems}
      {fields?.map((field) => {
        if (field?.tabKey === "1") {
          return field.field;
        }
        return null;
      })}
      {fields?.map((field) => {
        if (!field?.tabKey) {
          return field.field;
        }
        return null;
      })}
    </>
  );

  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <InfoCircleOutlined />
          General Info
        </span>
      ),
      children: <MainTab record={record} mainTabFields={mainTabFields} action={action} />,
    },
    ...(tabs?.map((tab, idx) => {
      const tabKey = (idx + 2).toString();
      return {
        key: tabKey,
        label: (
          <>
            {tab.icon && <tab.icon />}
            {tab.name}
          </>
        ),
        children:
          fields?.map((field) => {
            if (field?.tabKey === tabKey) {
              return (
                <Card bordered={false} style={{ height: "100%", backgroundColor: "#fafafa" }}>
                  {field.field}
                </Card>
              );
            }
            return null;
          }) || [],
      };
    }) || []),
  ];

  return (
    <AntDTabs
      defaultActiveKey='1'
      type='card'
      size='middle'
      tabPosition='top'
      tabBarStyle={{ justifyContent: "right" }}
      items={tabItems}
    />
  );
};
