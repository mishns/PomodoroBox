import { DayStat } from "@pages/Content";

export const DEV_COOKIES_HEADERS: RequestInit =
  process.env.NODE_ENV === "development"
    ? { credentials: "include", mode: "cors", referrerPolicy: "same-origin" }
    : {};
export const API_URL = "http://127.0.0.1:4000";

type WeekDaysNumStrDict = {
  [key: number]: { full: string; short: string };
};
export const RU_NUM_STR_WEEK_DAYS: WeekDaysNumStrDict = {
  1: { full: "Понедельник", short: "Пн" },
  2: { full: "Вторник", short: "Вт" },
  3: { full: "Среда", short: "Ср" },
  4: { full: "Четверг", short: "Чт" },
  5: { full: "Пятница", short: "Пт" },
  6: { full: "Суббота", short: "Сб" },
  0: { full: "Воскресенье", short: "Вс" },
};

export function getFullRuWeekDayStr(dayStat: DayStat): string {
  const enWeekDay: number = dayStat.weekDay;
  const rusFullWeekDay: string = RU_NUM_STR_WEEK_DAYS[enWeekDay].full;
  return rusFullWeekDay;
}

export function getShortRuWeekDayStr(dayStat: DayStat): string {
  const enWeekDay: number = dayStat.weekDay;
  const rusShortWeekDay: string = RU_NUM_STR_WEEK_DAYS[enWeekDay].short;
  return rusShortWeekDay;
}

type WeekDaysStrNumDict = { [key: string]: number };
export const RU_STR_NUM_WEEK_DAYS: WeekDaysStrNumDict = {
  Понедельник: 1,
  Вторник: 2,
  Среда: 3,
  Четверг: 4,
  Пятница: 5,
  Суббота: 6,
  Воскресенье: 0,
  Пн: 1,
  Вт: 2,
  Ср: 3,
  Чт: 4,
  Пт: 5,
  Сб: 6,
  Вс: 0,
};

export function getWeekDayFromStr(weekDayStr: string): number {
  return RU_STR_NUM_WEEK_DAYS[weekDayStr];
}
