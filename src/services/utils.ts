export const extractContent = (htmlString: string) => {
  const span = document.createElement("span");
  span.innerHTML = htmlString ?? "";
  return span.textContent || span.innerText;
};
