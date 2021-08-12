import { format } from "date-fns";

export const parseDate = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  return format(date, "yyyy-MM-dd") + "T" + format(date, "hh:mm");
};

export const parseDatePretty = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  return format(date, "eee, LLL d @h:mm aaa");
};
