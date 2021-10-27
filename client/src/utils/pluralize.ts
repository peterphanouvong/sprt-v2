export const pluralize = (num: number | undefined, str: string) => {
  if (num === undefined) return "";
  if (num == 1) {
    return str;
  } else {
    return str + "s";
  }
};
