import {
  DayStat,
  WorkPeriod,
  PausePeriod,
  TimersStatistics,
} from "@pages/Content";
import { randomIntFromInterval } from "@src/utils/index";
import { minusOneDay } from "@src/utils";

const HOUR_MS: number = 3600000;
const MINUTE_MS: number = 60000;

const currDate = new Date();

function generateDayStat() {
  const workPeriods: WorkPeriod[] = [];
  for (let i = 0; i < randomIntFromInterval(1, 7); i++) {
    const hours: number = HOUR_MS * randomIntFromInterval(1, 7);
    const minutes: number = MINUTE_MS * randomIntFromInterval(0, 60);
    const workPeriod = { time: hours + minutes };
    workPeriods.push(workPeriod);
  }

  const pausePeriods: PausePeriod[] = [];
  for (let i = 0; i < randomIntFromInterval(1, 7); i++) {
    const hours: number = HOUR_MS * randomIntFromInterval(1, 7);
    const minutes: number = MINUTE_MS * randomIntFromInterval(0, 60);
    const pausePeriod = { time: hours + minutes };
    pausePeriods.push(pausePeriod);
  }

  const timersComplete = randomIntFromInterval(1, 30);
  const dateStr = currDate.toLocaleDateString();
  const weekDay = currDate.getDay();

  minusOneDay(currDate);

  return {
    dateStr,
    weekDay,
    workPeriods,
    pausePeriods,
    timersComplete,
  };
}

export function generateStat(daysInStat: number = 21): TimersStatistics {
  const statMap: TimersStatistics = new Map<string, DayStat>();
  for (let day = 0; day < daysInStat; day++) {
    const dayStat: DayStat = generateDayStat();
    statMap.set(dayStat.dateStr, dayStat);
  }
  return statMap;
}
