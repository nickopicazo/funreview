export const paths = {
  home: "/",
  map: "/mapa",
  settings: "/mga-setting",
  quarter: (quarterId: string) => `/markahan/${quarterId}`,
  subject: (quarterId: string, subjectId: string) =>
    `/markahan/${quarterId}/${subjectId}`,
  week: (quarterId: string, subjectId: string, weekId: string) =>
    `/markahan/${quarterId}/${subjectId}/${weekId}`,
  activity: (
    quarterId: string,
    subjectId: string,
    weekId: string,
    activityId: string,
  ) => `/markahan/${quarterId}/${subjectId}/${weekId}/${activityId}`,
}

export function weekKey(quarterId: string, subjectId: string, weekId: string) {
  return `${quarterId}/${subjectId}/${weekId}`
}
