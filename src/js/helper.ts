export const getHoursToNow = function (taskDate: Date): number {
  return Math.floor((taskDate.getTime() - new Date().getTime()) / 3_600_000);
};
