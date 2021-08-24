export const pluralize = (num: number, str: string) => {
  if (num == 1) {
    return str;
  } else {
    return str + "s";
  }
};
