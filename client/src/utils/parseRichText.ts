export const parseRichText = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
  }
};
