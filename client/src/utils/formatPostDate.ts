import { format, formatDistance } from "date-fns";

export function formatPostDate(date: Date | string): string {
  // let formattedDate = new Date(date);
  const formattedDate = formatDistance(new Date(), date);

  return formattedDate + " ago";
}

export function formatDate(date: Date | string): string {
  const formattedDate = format(date, "PP");

  return formattedDate;
}
