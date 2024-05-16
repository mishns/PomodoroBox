import { TimersStatistics } from "@contexts/StatisticsContext";
import { randomIntFromInterval } from "@src/utils/index";
import { minusOneDay } from "@src/utils";
import { DayStat, Period } from "@api/DayStat";
import { getDayUniqueId } from "@src/utils/getDayUniqueId";

const HOUR_MS: number = 3600000;
const MINUTE_MS: number = 60000;

let currDate = new Date();

function generateDayStat() {
  const workPeriods: Period[] = [];
  for (let i = 0; i < randomIntFromInterval(1, 2); i++) {
    const hours: number = HOUR_MS * randomIntFromInterval(0, 1);
    const minutes: number = MINUTE_MS * randomIntFromInterval(0, 60);
    const workPeriod = { time: hours + minutes };
    workPeriods.push(workPeriod);
  }

  const pausePeriods: Period[] = [];
  for (let i = 0; i < randomIntFromInterval(1, 2); i++) {
    const hours: number = HOUR_MS * randomIntFromInterval(0, 1);
    const minutes: number = MINUTE_MS * randomIntFromInterval(0, 60);
    const pausePeriod = { time: hours + minutes };
    pausePeriods.push(pausePeriod);
  }

  const id = getDayUniqueId(currDate);
  const date = currDate;
  const timersComplete = randomIntFromInterval(1, 30);
  const tasksComplete = randomIntFromInterval(1, 10);

  currDate = minusOneDay(currDate);

  return {
    id,
    date,
    workPeriods,
    pausePeriods,
    timersComplete,
    tasksComplete,
  };
}

export function generateStat(daysInStat: number = 30): TimersStatistics {
  const statMap: TimersStatistics = new Map<number, DayStat>();
  for (let day = 0; day < daysInStat; day++) {
    const dayStat: DayStat = generateDayStat();
    statMap.set(dayStat.id, dayStat);
  }
  return statMap;
}
