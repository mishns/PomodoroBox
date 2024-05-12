import moment from "moment";

export function getDayUniqueId(date: Date) {
  const beginningDay = moment("1970-01-01", "YYYY-MM-DD");
  const day = moment(date);
  const dayId = day.diff(beginningDay, "days");
  return dayId;
}
