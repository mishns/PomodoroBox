import { validateResponse } from "@api/validateResponse";
import { API_URL, DEV_COOKIES_HEADERS } from "@constants/*";
import { z } from "zod";

const STAT_URL = `${API_URL}/stat`;

export const periodSchema = z.object({ time: z.number() });
export type Period = z.infer<typeof periodSchema>;

export const idDayStatSchema = z.object({
  id: z.number(),
  dateStr: z.string(),
  weekDay: z.number(),
  workPeriods: z.array(periodSchema),
  pausePeriods: z.array(periodSchema),
  timersComplete: z.number(),
  tasksComplete: z.number(),
});
export type IdDayStat = z.infer<typeof idDayStatSchema>;
export type DayStat = Omit<IdDayStat, "id">;

export const daysStatisticsSchema = z.array(idDayStatSchema);
export type DaysStatistics = z.infer<typeof daysStatisticsSchema>;
export function fetchDaysStat(): Promise<DaysStatistics> {
  const data = fetch(`${STAT_URL}`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => daysStatisticsSchema.parse(data));
  return data;
}

export const createDayStatRespSchema = z.object({ id: z.number().optional() });
export type CreateDayStatRespSchema = z.infer<typeof createDayStatRespSchema>;
export function createDayStat(
  dayStat: IdDayStat,
): Promise<CreateDayStatRespSchema> {
  return fetch(`${STAT_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dayStat),
    ...DEV_COOKIES_HEADERS,
  })
    .then(validateResponse)
    .then(data => createDayStatRespSchema.parse(data))
    .then(data => data);
}

export function updateDayStat(dayStat: IdDayStat): Promise<Response | Error> {
  return fetch(`${STAT_URL}/${dayStat.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dayStat),
    ...DEV_COOKIES_HEADERS,
  }).then(validateResponse);
}

export function getDayStatById(id: number): Promise<IdDayStat | undefined> {
  return fetch(`${STAT_URL}/${id}`, DEV_COOKIES_HEADERS)
    .then(validateResponse, undefined)
    .then(response => response.json())
    .then(data => idDayStatSchema.parse(data))
    .catch(() => undefined);
}

export const fetchDayStatRespSchema = z.array(idDayStatSchema);
export type FetchDayStatResp = z.infer<typeof fetchDayStatRespSchema>;
export function getDayStatByDateStr(
  dateStr: string,
): Promise<FetchDayStatResp> {
  return fetch(`${STAT_URL}?dateStr=${dateStr}`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => fetchDayStatRespSchema.parse(data));
}
