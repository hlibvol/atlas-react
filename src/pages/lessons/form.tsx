import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Button } from "@pankod/refine-antd";
import { Action, Resource } from "services/enums";
import { DrawerForm } from "components/resource/form";
import { ILesson } from "interfaces";
import { useAppSelector } from "redux/hooks";
import React from "react";

export const LessonForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const resource = Resource.LESSON;
  const { action, itemId } = useAppSelector((state) => state.drawer);

  const renderFields = (lesson: ILesson | BaseRecord) => (
    <>
      <Form.Item name='is_template' hidden />
      <Form.Item label={t("lessons.fields.duration")} name='duration'>
        <Input />
      </Form.Item>
    </>
  );

  const footer =
    itemId && action === Action.EDIT ? (
      <Button href={`/editor/${resource}/${itemId}`} target='_blank'>
        Open Designer
      </Button>
    ) : null;

  return <DrawerForm resource={resource} renderFields={renderFields} footer={footer} />;
};
