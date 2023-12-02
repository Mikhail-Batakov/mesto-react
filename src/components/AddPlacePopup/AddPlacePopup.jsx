import useFormValidate from "../../utils/hooks/useFormValidate";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoadingPopup,
}) {
  const {
    formValues,
    errors,
    isFormValid,
    isInputValid,
    handleChange,
    resetForm,
  } = useFormValidate();


  function handleClosePopupResetForm() {
    onClose();
    resetForm();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(formValues, resetForm);
  }

  const inputErrorClass = (input) =>
    input in isInputValid && !isInputValid[input]
      ? "form__input_type_error"
      : "";

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      titleBtn="Создать"
      isOpen={isOpen}
      onClose={handleClosePopupResetForm}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      isLoadingPopup={isLoadingPopup}
    >
      <label className="form__label" htmlFor="name">
        <input
          id="name"
          className={`form__input form__input_type_place-name ${inputErrorClass(
            "name"
          )}`}
          name="name"
          minLength={2}
          maxLength={30}
          type="text"
          required
          placeholder="Название"
          value={formValues.name || ""}
          disabled={isLoadingPopup}
          onChange={handleChange}
        />
        <span className="form__span-error name-error">{errors.name}</span>
      </label>
      <label className="form__label" htmlFor="link">
        <input
          id="link"
          className={`form__input form__input_type_place-name ${inputErrorClass(
            "link"
          )}`}
          name="link"
          type="url"
          required
          placeholder="Ссылка на картинку"
          value={formValues.link || ""}
          disabled={isLoadingPopup}
          onChange={handleChange}
        />
        <span className="form__span-error link-error">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
}
