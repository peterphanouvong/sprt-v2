export const getYoutubeVideoId = (url: string | undefined) => {
  if (url === undefined) return "QhBnZ6NPOY0";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};
