import { useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "grapesjs-blocks-flexbox";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import "grapesjs/dist/css/grapes.min.css";

import "./styles.scss";
import { Config } from "../../../services/config";
import { TOKEN_KEY } from "../../../services/constants";

import { BaseKey } from "@pankod/refine-core";

interface IEditorProps {
  resource: string;
  id: BaseKey;
}
export const Editor: React.FC<IEditorProps> = ({ resource, id }: IEditorProps) => {
  const designEndpoint = `${Config.apiEndpoint}/v1/${resource}/${id}`;
  const token = localStorage.getItem(TOKEN_KEY);
  useEffect(() => {
    grapesjs.init({
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fetchOptions: (opts: any) => (opts.method === "POST" ? { method: "PUT" } : {}),
            onStore: (data) => ({
              id: id,
              page_content: JSON.stringify(data),
            }),
            onLoad: (result) => (result.page_content ? JSON.parse(result.page_content) : {}),
          },
        },
      },
    });
  }, []);
  return (
    <div>
      <div className='main-content'>
        <div id='editor'></div>
      </div>
    </div>
  );
};
