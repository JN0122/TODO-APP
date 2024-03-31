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

const init = function () {
  taskView.addHandlerRender(controlTaskList);
  taskView.addHandlerAddTask(controlAddTask);
  addTaskView.addHandlerCancel(controlTaskList);
};
init();
