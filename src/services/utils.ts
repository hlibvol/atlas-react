export const extractContent = (htmlString: string) => {
  const span = document.createElement("span");
  span.innerHTML = htmlString ?? "";
  return span.textContent || span.innerText;
};

// @ts-ignore
export const getObjectValuesAsArray = (obj) => {
  const keywords = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      keywords.push(getObjectValuesAsArray(obj[key]));
    } else {
      keywords.push(obj[key]);
    }
  }
  return keywords as string[];
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
