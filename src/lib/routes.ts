export const paths = {
  home: "/",
  map: "/map",
  settings: "/settings",
  quarter: (quarterId: string) => `/quarter/${quarterId}`,
  subject: (quarterId: string, subjectId: string) =>
    `/quarter/${quarterId}/${subjectId}`,
  week: (quarterId: string, subjectId: string, weekId: string) =>
    `/quarter/${quarterId}/${subjectId}/${weekId}`,
  activity: (
    quarterId: string,
    subjectId: string,
    weekId: string,
    activityId: string,
  ) => `/quarter/${quarterId}/${subjectId}/${weekId}/${activityId}`,
}

export function weekKey(quarterId: string, subjectId: string, weekId: string) {
  return `${quarterId}/${subjectId}/${weekId}`
}
