import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "grapesjs-blocks-flexbox";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import "grapesjs/dist/css/grapes.min.css";

import "./styles.scss";
import { Config } from "../../../services/config";
import { TOKEN_KEY } from "../../../services/constants";

interface IfirstChildProps {
  source: string;
  source_id?: number;
}
export const Editor: React.FC<IfirstChildProps> = ({ source, source_id }) => {
  const [editor, setEditor] = useState<any>(null);

  const designEndpoint = `${Config.apiEndpoint}/v1/${source}/${source_id}`;

  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      width: "auto",
      plugins: [gjsPresetWebpage, gjsBlockBasic, "gjs-blocks-flexbox", grapesjsPluginForms],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBlockBasic,
        "gjs-blocks-flexbox": {},
        grapesjsPluginForms,
      },
      storageManager: {
        type: "remote",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
          remote: {
            headers: { Authorization: `Bearer ${token}` },
            urlLoad: designEndpoint,
            urlStore: designEndpoint,

            fetchOptions: (opts: any) => (opts.method === "POST" ? { method: "PUT" } : {}),

            onStore: (data) => ({
              id: source_id,
              page_content: JSON.stringify(data),
            }),
            onLoad: (result) => (result.page_content ? JSON.parse(result.page_content) : {}),
          },
        },
      },
    });

    setEditor(editor);
  }, []);
  return (
    <div>
      <div className='main-content'>
        <div id='editor'></div>
      </div>
    </div>
  );
};
