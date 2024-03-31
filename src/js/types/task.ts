export type Task = {
  id: number;
  name: string;
  completed: Boolean;
  completeBefore?: Date;
  hoursLeft?: number;
  late?: boolean;
};
