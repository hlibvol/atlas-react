export function abCustomPlugin(editor: any, options: any = {}) {
  editor.BlockManager.add("my-first-block", {
    label: "Url-Link",
    category: "AB Custom",
    content: `<a data-gjs-editable="false" data-gjs-tooltip="Edit link" href="https://github.com" target="_blank">test url link</a>`,
    attributes: { class: "fa fa-link" },
    onrender() {
      this.getEl().addEventListener("click", (e: any) => {
        //   e.preventDefault();
        window.open(this.getAttribute("href"), "_blank");
      });
    },
  });
}
