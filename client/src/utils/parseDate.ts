import { format } from "date-fns";

export const parseDate = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  return format(date, "yyyy-MM-dd") + "T" + format(date, "HH:mm");
};

export const parseDatePretty = (dateString: string) => {
  const date = new Date(parseInt(dateString));
  return format(date, "eee, LLL d @ h:mm aaa");
};

export const formatDateForPostgres = (dateString: string) => {
  return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss xxx");
};
