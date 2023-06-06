import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { ILesson } from "interfaces";
import { renderPagesHtml } from "hooks/common";

export const LessonShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ILesson>();
  const lesson = queryResult.data?.data;
  const pagesHtml =
    lesson && lesson.page_content ? JSON.parse(lesson.page_content).pagesHtml : null;
  return <Show title={lesson ? lesson.name + " (Preview)" : ""}>{renderPagesHtml(pagesHtml)}</Show>;
};
