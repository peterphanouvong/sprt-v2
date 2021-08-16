export const errorDetailToObject = (errorDetailString: string) => {
  const matches = errorDetailString.match(/\((.*?)\)/g);

  if (!matches) return null;

  return matches.map((s) => s.slice(1, s.length - 1));
};
