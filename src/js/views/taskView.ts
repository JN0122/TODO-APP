import { Task } from "../types/task";
class TaskView {
  _parentEl: HTMLElement | null =
    document.querySelector<HTMLElement>(".main__card");
  _message: string = "Add tasks";

  addHandlerRender(handler: () => void): void {
    window.addEventListener("load", handler);
  }

  addHandlerAddTask(handler: () => void) {
    this._parentEl?.addEventListener("click", function (e: Event) {
      const link = (e.target as HTMLElement).closest("a#addTask");

      if (!link) return;

      handler();
    });
  }

  addHandlerDeleteTask(handler: (id: number) => void) {
    this._parentEl?.addEventListener("click", function (e: Event) {
      const link: HTMLElement | null = (e.target as HTMLElement).closest(
        "a.task__remove"
      );
      if (!link) return;
      const taskId: string | undefined = link.closest("li")?.dataset.id;

      if (!taskId) throw new Error("Task element not found!");

      if (confirm("This operation is irreversible. Are you sure?")) {
        handler(+taskId);
      }
    });
  }

  _changeTaskStatus(liEl: HTMLElement) {
    const label = liEl.querySelector(".task__label");
    const date = liEl.querySelector(".task__date");

    date?.classList.toggle("task--completed");
    label?.classList.toggle("task--completed");
  }

  addHandlerTaskComplete(handler: (id: number) => void) {
    this._parentEl?.addEventListener("change", (e: Event) => {
      const inputEl: HTMLElement | null = (e.target as HTMLElement).closest(
        "input.task__checkbox"
      );

      if (!inputEl) return;

      const liEl = inputEl.closest("li");
      if (!liEl || !liEl.dataset.id)
        throw new Error("Cannot find task element");

      this._changeTaskStatus(liEl);

      handler(+liEl.dataset.id);
    });
  }

  _generatePlaceholderMarkup() {
    return `<div class="task-list--placeholder-message">${this._message}</div>`;
  }

  _generateItemMarkup(task: Task): string {
    return `<li class="task task-list__task" data-id=${task.id}>
    <div class="task__name">
      <input
        class="task__checkbox"
        type="checkbox"
        name="task-${task.id}"
        id="task-${task.id}"
        ${task.completed && "checked"}
      />
      <label class="task__label ${
        task.completed && "task--completed"
      }" for="task-${task.id}">${task.name}</label>
    </div>
    <div class="task__details">
        <div class="task__date ${
          (task.late || task.hoursLeft) && "warning-color"
        } ${task.completed && "task--completed"}">
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
          src="${new URL("../../img/trash-can-solid.svg", import.meta.url)}"
          alt="Trash icon"
        />
      </a>
    </div>
  </li>`;
  }

  _generateListMarkup(tasks: Task[]) {
    if (tasks.length) {
      return tasks.map((task: Task) => this._generateItemMarkup(task)).join("");
    }
    return this._generatePlaceholderMarkup();
  }

  _generateSectionWraperMarkup(content: string) {
    return `<div class="card__header">
    <h1 class="card__title center">TODO APP</h1>
    <a href="#" class="card__link" id="addTask">
      <img
        src="${new URL("../../img/plus-solid.svg", import.meta.url)}"
        alt="Plus icon"
        class="card__icon card__icon--right icon--medium"
      />
    </a>
  </div>
  <div class="card__body">
    <!-- <div class="input-group card__input-group">
      <label for="task-category" class="input-group__label">
        Category
      </label>
      <div class="input-wrapper">
        <input
          type="text"
          name="task-category"
          id="task-category"
          class="input-wrapper__input"
          placeholder="Search for category"
        />
        <img
          src="./src/img/magnifying-glass-solid.svg"
          alt="Magnifying glass icon"
          class="input-wrapper__icon icon--medium"
        />
      </div> -->
    </div>
    <div class="tasks">
      <p class="tasks__header">Task list</p>
      <ul class="task-list">${content}</ul>
    </div>
  </div>`;
  }

  update(tasks: Task[]) {
    const _taskList: HTMLElement | null =
      document.querySelector<HTMLElement>(".task-list");
    if (!_taskList) throw new Error("Cannot find task list element!");
    _taskList.innerHTML = this._generateListMarkup(tasks);
  }

  render(tasks: Task[]) {
    if (!this._parentEl) throw new Error("Parent element not found!");

    this._parentEl.innerHTML = this._generateSectionWraperMarkup(
      this._generateListMarkup(tasks)
    );
  }
}

export default new TaskView();
