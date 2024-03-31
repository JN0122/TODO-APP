`use strict`;
import * as model from "./model";
import { taskView, addTaskView } from "./views";

const controlTaskList = function (): void {
  model.getTasks();
  taskView.render(model.state.tasks);
};

const controlAddTask = function (): void {
  addTaskView.render();
};

const controlDeleteTask = function (id: number): void {
  model.deleteTask(id);
  taskView.update(model.state.tasks);
};

const controlTaskComplete = function (id: number) {
  model.changeTaskStatus(id);
};

const init = function () {
  taskView.addHandlerRender(controlTaskList);
  taskView.addHandlerAddTask(controlAddTask);
  taskView.addHandlerDeleteTask(controlDeleteTask);
  taskView.addHandlerTaskComplete(controlTaskComplete);
  addTaskView.addHandlerCancel(controlTaskList);
};
init();
