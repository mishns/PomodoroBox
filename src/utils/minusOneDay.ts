export function minusOneDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}
