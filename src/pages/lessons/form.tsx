import { BaseRecord, IResourceComponentsProps, useTranslate } from "@pankod/refine-core";
import { Form, Input, Collapse, Button } from "@pankod/refine-antd";
import { CreateOrEditForm } from "components/form";
import { usePanelHeader } from "hooks/common";
import { useParams } from "react-router-dom";
import { Action, Resource } from "services/enums";
import { Editor } from "components/Editor";
import { DrawerForm } from "components/resource/form";
import { ILesson } from "interfaces";
import { useAppSelector } from "redux/hooks";
import { setDrawerWidth,setHideItems } from "redux/slices/drawerSlice";
import { useAppDispatch } from "redux/hooks";
import React, { useState } from "react";

export const LessonForm: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { Panel } = Collapse;
  //const { action, id } = useParams();
  const resource = Resource.LESSON;
  const { action, itemId, width, hideAll } = useAppSelector((state) => state.drawer);
  const dispatch = useAppDispatch();
  console.log({ action, itemId,width });
  const [renderpageContent, setRenderpageContent] = React.useState<boolean>(false);
  const renderFields = (lesson: ILesson | BaseRecord) => (
    
      <>
      <Form.Item name='is_template' hidden />
      <Form.Item label={t("lessons.fields.duration")} name='duration' hidden={hideAll}>
        <Input />
      </Form.Item>
      {renderpageContent? 
      <Form.Item label={"Page Content"} name='page_content' hidden={!hideAll}>
      {itemId ? <Editor resource={Resource.LESSON} id={itemId} /> : null}
      </Form.Item>
      :null}
      </>
  );

  // return (
  //   <CreateOrEditForm>
  //     <Panel key='1' header={usePanelHeader("Details", "Name, Description and Roles")}>
  //       <Form.Item
  //         label={t("lessons.fields.title")}
  //         name='name'
  //         rules={[
  //           {
  //             required: true,
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>
  //       <Form.Item name='is_template' hidden />
  //       <Form.Item label={t("lessons.fields.description")} name='description'>
  //         <Input.TextArea />
  //       </Form.Item>
  //       <Form.Item label={t("lessons.fields.duration")} name='duration'>
  //         <Input />
  //       </Form.Item>
  //     </Panel>
  //     {action === "edit" && (
  //       <Panel header={usePanelHeader("Designer", "Page content")} key='2' style={{ padding: "0" }}>
  //         {id ? <Editor resource={Resource.LESSON} id={id} /> : null}
  //       </Panel>
  //     )}
  //   </CreateOrEditForm>
  // );
  const expandDrawer = ()=>{
    console.log("expand drawer");
    setRenderpageContent(true);
    dispatch(setDrawerWidth('84%'));
    dispatch(setHideItems(true));
  }
  const footer =
    itemId && action === Action.EDIT ? (
      <Button href={`/editor/${resource}/${itemId}`} target='_blank'>
        Open Designer
      </Button>
    ) : null;
    // const footer =
    // itemId && action === Action.EDIT ? (
    //   <Button onClick={expandDrawer}>
    //     Open Designer
    //   </Button>
    // ) : null;    
  return <DrawerForm resource={resource} renderFields={renderFields} footer={footer} />;
};
