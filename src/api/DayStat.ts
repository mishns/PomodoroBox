import { validateResponse } from "@api/validateResponse";
import { API_URL, DEV_COOKIES_HEADERS } from "@constants/*";
import { z } from "zod";

const STAT_URL = `${API_URL}/stat`;

export const periodSchema = z.object({ time: z.number() });
export type Period = z.infer<typeof periodSchema>;

export const dayStatSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  workPeriods: z.array(periodSchema),
  pausePeriods: z.array(periodSchema),
  timersComplete: z.number(),
  tasksComplete: z.number(),
});
export type DayStat = z.infer<typeof dayStatSchema>;

export const daysStatisticsSchema = z.array(dayStatSchema);
export type DaysStatistics = z.infer<typeof daysStatisticsSchema>;
export function fetchDaysStat(): Promise<DaysStatistics> {
  return fetch(`${STAT_URL}`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => daysStatisticsSchema.parse(data));
}

export const createDayStatRespSchema = z.object({ id: z.number().optional() });
export type CreateDayStatRespSchema = z.infer<typeof createDayStatRespSchema>;
export function fetchCreateDayStat(
  dayStat: DayStat,
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

export function fetchUpdateDayStat(
  dayStat: DayStat,
): Promise<Response | Error> {
  return fetch(`${STAT_URL}/${dayStat.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dayStat),
    ...DEV_COOKIES_HEADERS,
  }).then(validateResponse);
}

export function fetchGetDayStatById(id: number): Promise<DayStat | undefined> {
  return fetch(`${STAT_URL}/${id}`, DEV_COOKIES_HEADERS)
    .then(validateResponse, undefined)
    .then(response => response.json())
    .then(data => dayStatSchema.parse(data))
    .catch(() => undefined);
}

export const fetchDayStatRespSchema = z.array(dayStatSchema);
export type FetchDayStatResp = z.infer<typeof fetchDayStatRespSchema>;
export function fetchGetDayStatByDateStr(
  dateStr: string,
): Promise<FetchDayStatResp> {
  return fetch(`${STAT_URL}?dateStr=${dateStr}`, DEV_COOKIES_HEADERS)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => fetchDayStatRespSchema.parse(data));
}
