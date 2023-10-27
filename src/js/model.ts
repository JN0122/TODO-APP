import { Task } from "./types/task";

type state = {
  tasks: Task[];
  completedTasks: Task[];
};

export const state: state = {
  tasks: [],
  completedTasks: [],
};

export const getTasks = function () {
  state.tasks = [
    {
      id: 1,
      name: "Do 15 pushups",
      completeBefore: new Date(Date.now() - 1000 * 60 * 60 * 24),
      completed: false,
    },
    {
      id: 2,
      name: "Do homework",
      completeBefore: new Date(Date.now() + 1000 * 60 * 60 * 2),
      completed: false,
    },
    {
      id: 3,
      name: "Do 30 jumping jacks",
      completeBefore: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      completed: true,
    },
    {
      id: 4,
      name: "Do 20 pull ups",
      completed: false,
    },
  ];
};

const getHoursToNow = function (taskDate: Date): number {
  return Math.floor((taskDate.getTime() - new Date().getTime()) / 3_600_000);
};

export const updateHoursleft = function () {
  state.tasks.map((task) => {
    if (!task.completeBefore) return;

    const hoursToNow: number = getHoursToNow(task.completeBefore);
    if (hoursToNow > 48) return;
    if (hoursToNow <= 0) {
      task.late = true;
      return;
    }

    task.hoursLeft = hoursToNow;
  });
};

export const deleteTask = function (id: number) {
  state.tasks = state.tasks.filter((task: Task) => task.id !== id);
};
