import { IJob, IUseCase } from "interfaces";
import grapesjs from "grapesjs";

export function abCustomPlugin(editor: grapesjs.Editor, options: grapesjs.PluginOptions) {
  const data = editor.getConfig().pluginsOpts;

  // use case matrix tables
  data?.abCustomPlugin?.useCases?.data?.data.forEach((item: IUseCase, index: number) => {
    editor.BlockManager.add(`matrix-${index}`, {
      label: `${item?.name}`,
      content: `
          <iframe src="/use-case-designer-view/use-cases/${item?.id}" frameborder="0" style="width: 100vw; height: 40vh;"></iframe>
      `,
      category: "Use Cases",
      attributes: { class: "fa fa-th" },
    });
  });

  // jobs
  data?.abCustomPlugin?.jobs?.data?.data.forEach((item: IJob, index: number) => {
    editor.BlockManager.add(`job-${index}`, {
      label: `${item.name}`,
      content: `<div data-rollno="${item.application_type_id}">name: ${item.name} Application Type Id: ${item.application_type_id}</div>`,
      category: "Jobs",
      attributes: { class: "fa fa-briefcase" },
    });
  });
}
