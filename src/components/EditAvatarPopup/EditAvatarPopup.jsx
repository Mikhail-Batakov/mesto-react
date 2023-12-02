import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useRef } from "react";
import useFormValidate from "../../utils/hooks/useFormValidate";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoadingPopup,
}) {
  const input = useRef();

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
    onUpdateAvatar({ avatar: input.current.value }, resetForm);
  }

  const inputErrorClass = (input) =>
    input in isInputValid && !isInputValid[input]
      ? "form__input_type_error"
      : "";

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      titleBtn="Сохранить"
      isOpen={isOpen}
      onClose={handleClosePopupResetForm}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      isLoadingPopup={isLoadingPopup}
    >
      <label className="form__label" htmlFor="avatar">
        <input
          id="avatar"
          className={`form__input form__input_type_avatar-link ${inputErrorClass(
            "avatar"
          )}`}
          name="avatar"
          type="url"
          required
          placeholder="Ссылка на картинку"
          ref={input}
          value={formValues.avatar || ""}
          disabled={isLoadingPopup}
          onChange={handleChange}
        />
        <span className="form__span-error avatar-error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
}
