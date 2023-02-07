/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "grapesjs-blocks-flexbox";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import "grapesjs/dist/css/grapes.min.css";

import "./styles.scss";
import { Config } from "services/config";
import { TOKEN_KEY } from "services/constants";
import { useParams } from "react-router-dom";

export const Editor: React.FC = () => {
  const { resource, itemId } = useParams<{ resource: string; itemId: string }>();
  const designEndpoint = `${Config.apiEndpoint}/v1/${resource}/${itemId}`;
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
            fetchOptions: (opts: any) => (opts.method === "POST" ? { method: "PUT" } : {}),
            // @ts-ignore
            onStore: (data: any, editor: any) => {
              // @ts-ignore
              const pagesHtml = editor.Pages.getAll().map((page) => {
                const component = page.getMainComponent();
                return {
                  html: editor.getHtml({ component }),
                  css: editor.getCss({ component }),
                };
              });
              return { id: itemId, page_content: JSON.stringify({ data, pagesHtml }) };
            },
            onLoad: (result) => {
              try {
                const data = JSON.parse(result.page_content).data;
                return data || {};
              } catch (error) {
                return {};
              }
            },
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
