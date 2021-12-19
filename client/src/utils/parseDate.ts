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

export const parseDateStandard = (dateString: string | null | undefined) => {
  if (dateString === null || dateString === undefined) return null;
  const date = new Date(parseInt(dateString));
  return format(date, "dd-MM-yyyy");
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

export const convert24hto12h = (time: string) => {
  const hours = Number(time.substr(0, 2));
  const minutes = Number(time.substr(3, 2));
  const AMPM = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hours12}:${minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })} ${AMPM}`;
};
