export type Task = {
  id: number;
  name: string;
  completed: boolean;
  completeBefore?: Date;
  hoursLeft?: number;
  late?: boolean;
};
