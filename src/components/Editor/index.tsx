/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
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
import { useList } from "@refinedev/core";
import { CustomPlugin } from "./CustomPlugin";
import { IJob, IUseCase } from "interfaces";
import { Resource } from "services/enums";

export const Editor: React.FC = () => {
  const editorRef = useRef(null);
  const { resource, itemId } = useParams<{ resource: string; itemId: any }>();
  const designEndpoint = `${Config.apiEndpoint}/v1/${resource}/${itemId}`;
  const token = localStorage.getItem(TOKEN_KEY);

  const jobs = useList<IJob>({
    resource: Resource.JOB,
  });

  const useCases = useList<IUseCase>({
    resource: Resource.USE_CASE,
  });

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const editor = grapesjs.init({
      container: editorRef.current,
      components: "",
      style: "",
      fromElement: true,
      plugins: [
        gjsPresetWebpage,
        gjsBlockBasic,
        "gjs-blocks-flexbox",
        grapesjsPluginForms,
        CustomPlugin,
      ],
      pluginsOpts: {
        gjsPresetWebpage: {},
        gjsBlockBasic,
        "gjs-blocks-flexbox": {},
        grapesjsPluginForms,
        CustomPlugin: {
          jobs,
          useCases,
        },
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
              return {
                id: itemId,
                page_content: JSON.stringify({ data, pagesHtml }),
              };
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
  }, [jobs, useCases, editorRef]);

  return (
    <div>
      <div className='main-content'></div>
      <div ref={editorRef}></div>
    </div>
  );
};
