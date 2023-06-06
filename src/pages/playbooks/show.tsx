import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { IPlayBook } from "interfaces";
import { renderPagesHtml } from "hooks/common";

export const PlayBookShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult: playbookQueryResult } = useShow<IPlayBook>();
  const playbook = playbookQueryResult.data?.data;

  const pagesHtml =
    playbook && playbook.page_content ? JSON.parse(playbook.page_content).pagesHtml : null;
  return (
    <Show title={playbook ? playbook.name + " (Preview)" : ""}>{renderPagesHtml(pagesHtml)}</Show>
  );
};
