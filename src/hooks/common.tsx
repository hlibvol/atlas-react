import { Typography } from "@pankod/refine-antd";
import { useNavigation, BaseKey } from "@pankod/refine-core";
import { useNavigate } from "react-router-dom";

export const usePanelHeader = (title: string, description = "") => {
  const { Text } = Typography;
  return (
    <Text strong>
      {title} &nbsp;<Text type='secondary'>{description}</Text>
    </Text>
  );
};

const generateCss = (css: string) => `<style>${css}</style>`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderPagesHtml = (pagesHtml: any) => {
  return pagesHtml
    ? pagesHtml.map((page: { html: string; css: string }) => (
        <div
          dangerouslySetInnerHTML={{
            __html: generateCss(page.css) + page.html.replace("<body>", "").replace("</body>", ""),
          }}
        />
      ))
    : null;
};

export const useDesignerEdit = (resource: string, id: BaseKey) => {
  const navigate = useNavigate();
  // const { editUrl } = useNavigation();
  const editUrl = `/editor/${resource}/${id}`;

  return { edit: () => navigate(editUrl), editUrl };
};
