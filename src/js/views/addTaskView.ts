class addTaskView {
  _parentEl: null | HTMLElement = document.querySelector(".main__card");

  addHandlerCancel(handler: () => void) {
    this._parentEl?.addEventListener("click", function (e: Event) {
      const link = (e.target as HTMLElement).closest("a#add-task-go-back");
      if (!link) return;
      handler();
    });
  }

  _generateMarkup(): string {
    return `<div class="card__header">
    <h1 class="card__title center">Create task</h1>
    <a href="#" class="card__link" id="add-task-go-back">
      <img
        src="${new URL("../../img/chevron-left-solid.svg", import.meta.url)}"
        alt="Go back icon"
        class="card__icon card__icon--left icon--medium"
      />
    </a>
  </div>
  <div class="card__body">
    <form class="form">
      <div class="input-group form__input-group">
        <label for="task-name" class="input-group__label">
          Task name<span class="primary-color">*</span>
        </label>
        <div class="input-wrapper">
          <input
            type="text"
            name="task-name"
            id="task-name"
            class="input-wrapper__input input-wrapper__input--error"
            placeholder="Task name"
          />
          <img
            src="${new URL("../../img/pencil-solid.svg", import.meta.url)}"
            alt="Pencil icon"
            class="input-wrapper__icon icon--medium"
          />
        </div>
        <p class="input-group__error">This field is reqired</p>
      </div>
      <div class="input-group form__input-group">
        <label for="task-category" class="input-group__label">
          Category<span class="primary-color">*</span>
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
            src="${new URL(
              "../../img/magnifying-glass-solid.svg",
              import.meta.url
            )}"
            alt="Magnifying glass icon"
            class="input-wrapper__icon icon--medium"
          />
        </div>
        <p class="input-group__error is-hidden">This field is reqired</p>
      </div>
      <div class="input-group form__input-group">
        <label for="task-date" class="input-group__label">
          Complete task before
        </label>
        <div class="input-group__2columns">
          <div class="input-wrapper">
            <input
              type="text"
              name="task-date"
              id="task-date"
              class="input-wrapper__input"
              placeholder="01-01-1970"
            />
            <img
              src="${new URL(
                "../../img/calendar-regular.svg",
                import.meta.url
              )}"
              alt="Calendar icon"
              class="input-wrapper__icon icon--medium"
            />
          </div>
          <div class="input-wrapper">
            <input
              type="text"
              name="task-hour"
              id="task-hour"
              class="input-wrapper__input"
              placeholder="12:00"
            />
            <img
              src="${new URL("../../img/clock-regular.svg", import.meta.url)}"
              alt="Clock icon"
              class="input-wrapper__icon icon--medium"
            />
          </div>
        </div>
        <p class="input-group__error is-hidden">This field is reqired</p>
      </div>
      <p class="form__info">
        <span class="primary-color">*</span> - required field
      </p>
      <button class="button button--w100 form__button" type="submit">
        Add task
      </button>
    </form>
  </div>`;
  }

  render(): void {
    if (!this._parentEl) throw new Error("Cannot find parent element!");
    this._parentEl.innerHTML = this._generateMarkup();
  }
}

export default new addTaskView();
