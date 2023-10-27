import { Task } from "./types/task";

class TaskView {
  _taskList = document.querySelector(".task-list");
  _placeholderMessage = "Add tasks";

  insertToTaskList(markup: string) {
    this._taskList?.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerDeleteTask(handler: (e: Event) => void) {
    this._taskList?.addEventListener("click", handler);
  }

  _generateMarkup(task: Task) {
    return `<li class="task task-list__task" data-id=${task.id}>
    <div class="task__name">
      <input
        class="task__checkbox"
        type="checkbox"
        name="task-${task.id}"
        id="task-${task.id}"
        ${task.completed ? "checked" : ""}
      />
      <label class="task__label" for="task-${task.id}">${task.name}</label>
    </div>
    <div class="task__details">
        <div class="task__date ${
          (task.late || task.hoursLeft) && "warning-color"
        }">
        ${
          task.hoursLeft
            ? `${task.hoursLeft} hours left`
            : task.completeBefore?.toLocaleDateString(navigator.language) || ""
        }
        </div>
      <!-- <div class="task__category">Workout</div> -->
      <!-- <a href="#" class="task__edit">
      <img
        class="icon--medium"
        src="./src/img/pen-to-square-solid.svg"
        alt="Pen to square icon"
      />
    </a> -->
      <a href="#" class="task__remove">
        <img
          class="icon--medium"
          src="${new URL("../img/trash-can-solid.svg", import.meta.url)}"
          alt="Trash icon"
        />
      </a>
    </div>
  </li>`;
  }

  _generatePlaceholderMarkup() {
    return `<div class="task-list--placeholder-message">${this._placeholderMessage}</div>`;
  }

  updateList(tasks: Task[]) {
    if (!this._taskList) throw Error("Task list element is not on the page!");

    this._taskList.innerHTML = "";

    if (tasks.length === 0) {
      this.insertToTaskList(this._generatePlaceholderMarkup());
    } else {
      tasks.map((task: Task) => {
        this.insertToTaskList(this._generateMarkup(task));
      });
    }
  }
}

export default new TaskView();
