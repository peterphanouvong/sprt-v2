import { format } from "date-fns";

export const parseDate = (dateString: string | null | undefined) => {
  if (dateString === null || dateString === undefined || dateString === "")
    return null;
  const date = new Date(parseInt(dateString));
  return format(date, "yyyy-MM-dd");
};

export const parseDatePretty = (dateString: string | null | undefined) => {
  if (dateString === null || dateString === undefined) return null;
  const date = new Date(parseInt(dateString));
  return format(date, "eee, LLL d");
};

export const formatDateForPostgres = (dateString: string) => {
  if (dateString === "") return null;
  return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss xxx");
};

export const convertEpochToDate = (epochString: string | null | undefined) => {
  if (epochString === null || epochString === undefined || epochString === "")
    return null;
  return new Date(parseInt(epochString)).toISOString().replace(/T.*Z/i, "");
};

export const tableViewFormat = (epochString: string | null | undefined) => {
  if (epochString === null || epochString === undefined || epochString === "")
    return null;
  return new Date(parseInt(epochString)).toLocaleDateString("en-GB", {
    // weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    // year: "",
    month: "short",
  });
};
