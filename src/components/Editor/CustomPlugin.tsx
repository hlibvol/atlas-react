import { IJob, IUseCase } from "interfaces";
import grapesjs from "grapesjs";
import { Resource } from "services/enums";

export function CustomPlugin(editor: grapesjs.Editor) {
  const data = editor.getConfig().pluginsOpts;
  const useCases = data?.CustomPlugin?.useCases?.data?.data;
  const jobs = data?.CustomPlugin?.jobs?.data?.data;

  // use case matrix tables
  if (useCases && useCases.length > 0) {
    useCases.forEach((item: IUseCase, index: number) => {
      editor.BlockManager.add(`matrix-${index}`, {
        label: `${item?.name}`,
        content: `
          <iframe src="/${Resource.USE_CASE}-view/${item?.id}" frameborder="0" style="width: 100vw; height: 40vh;"></iframe>
      `,
        category: "Use Cases",
        attributes: { class: "fa fa-th" },
      });
    });
  }

  // jobs

  if (jobs && jobs.length > 0)
    jobs.forEach((item: IJob, index: number) => {
      editor.BlockManager.add(`job-${index}`, {
        label: `${item.name}`,
        content: `<div data-rollno="${item.application_type_id}">name: ${item.name} Application Type Id: ${item.application_type_id}</div>`,
        category: "Jobs",
        attributes: { class: "fa fa-briefcase" },
      });
    });
}
