import { format } from "date-fns";

export const parseDate = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  console.log(date.getMonth().toLocaleString("en-US"));

  return (
    date.getFullYear() +
    "-" +
    ("0" + date.getMonth()).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    date.toLocaleTimeString()
  );
};

export const parseDatePretty = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  return format(date, "eee, LLL d @h:mm aaa");
};
