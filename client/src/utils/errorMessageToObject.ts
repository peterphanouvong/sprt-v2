export const errorMessageToObject = (error: string) => {
  return JSON.parse(error.replace("[GraphQL] ", ""));
};
