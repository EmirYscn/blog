import { formatDistance } from "date-fns";

export function formatPostDate(date: Date): string {
  // let formattedDate = new Date(date);
  const formattedDate = formatDistance(new Date(), date);
  console.log(formattedDate);
  return formattedDate + " ago";
}
