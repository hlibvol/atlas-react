import { IResourceComponentsProps, useShow, useTranslate } from "@pankod/refine-core";
import { Show, Collapse } from "@pankod/refine-antd";
import { IPlayBook } from "interfaces";
import { renderPagesHtml, usePanelHeader } from "hooks/common";
import { Resource } from "services/enums";
import { CaretRightOutlined } from "@ant-design/icons";
import { ABDivider, HTMLContent, TagList } from "components/core";

export const PlayBookShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { queryResult: playbookQueryResult } = useShow<IPlayBook>();
  const { data, isLoading } = playbookQueryResult;
  const playbook = data?.data;

  const { Panel } = Collapse;
  const pagesHtml =
    playbook && playbook.page_content ? JSON.parse(playbook.page_content).pagesHtml : null;
  console.log("pagesHtml", pagesHtml);
  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        title: playbook?.name,
      }}
    >
      {!isLoading ? (
        <Collapse
          defaultActiveKey={["1"]}
          style={{ gap: "8px" }}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Panel
            key='1'
            header={usePanelHeader("Details", "Description, Application URL and Roles")}
          >
            <ABDivider>{t("playbooks.fields.description")}</ABDivider>
            {playbook?.description && <HTMLContent>{playbook.description}</HTMLContent>}

            <ABDivider>Associated Roles</ABDivider>
            {playbook?.roles && <TagList resource={Resource.ROLE} records={playbook.roles} />}
          </Panel>
          <Panel
            header={usePanelHeader("Designer", "Page content")}
            key='2'
            style={{ padding: "0" }}
          >
            {renderPagesHtml(pagesHtml)}
          </Panel>
        </Collapse>
      ) : null}
    </Show>
  );
};
