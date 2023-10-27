import * as model from "./model";
import taskView from "./view";

const controlDeleteTask = function (e: Event) {
  const link: HTMLAnchorElement | null = (e.target as HTMLElement).closest("a");
  if (!link?.classList.contains("task__remove")) return;

  const s_id: string | undefined = link.closest("li")?.dataset.id;

  if (!s_id) return;
  alert("This operation is irreversible. Are you sure?");
  model.deleteTask(Number.parseInt(s_id));
  taskView.updateList(model.state.tasks);
};

const init = function () {
  model.getTasks();
  model.updateHoursleft();
  taskView.updateList(model.state.tasks);
  taskView.addHandlerDeleteTask(controlDeleteTask);
};
init();
