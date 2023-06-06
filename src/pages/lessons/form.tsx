import { BaseRecord, IResourceComponentsProps, useNavigation, useTranslate } from "@refinedev/core";
import { Form, Input, Button, Space } from "antd";
import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Action, Resource } from "services/enums";
import { DrawerForm } from "components/Resource/form";
import { ILesson } from "interfaces";
import { useAppSelector } from "redux/hooks";
import React from "react";

export const LessonForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const resource = Resource.LESSON;
  const { action, itemId } = useAppSelector((state) => state.drawer);
  const { showUrl } = useNavigation();

  const renderFields = (lesson: ILesson | BaseRecord) => (
    <>
      <Form.Item name='is_template' hidden initialValue={true} />
      <Form.Item label={t("lessons.fields.duration")} name='duration'>
        <Input />
      </Form.Item>
    </>
  );

  const footer =
    itemId && action === Action.EDIT ? (
      <Space>
        <Button
          icon={<PlayCircleOutlined rev={undefined} />}
          type='primary'
          href={`/editor/${resource}/${itemId}`}
          target='_blank'
        >
          Design {t(`${resource}.fields.resourceLabel`)}
        </Button>
        <Button
          icon={<EyeOutlined rev={undefined} />}
          type='primary'
          href={showUrl(resource, itemId)}
          target='_blank'
        >
          Preview {t(`${resource}.fields.resourceLabel`)}
        </Button>
      </Space>
    ) : null;

  return <DrawerForm resource={resource} renderFields={renderFields} footer={footer} />;
};
