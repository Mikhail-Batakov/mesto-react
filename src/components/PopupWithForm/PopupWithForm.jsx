import usePopupCloser from "../../utils/hooks/usePopupCloser";

export default function PopupWithForm({
  name,
  title,
  titleBtn,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoadingPopup,
  isFormValid = true,
}) {
  
  usePopupCloser(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn popup__close-btn_type_edit-profile style-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h3
          className={`popup__title ${
            name === "delete-card" ? "popup__title_type_delete-card" : ""
          }`}
        >
          {title}
        </h3>
        <form
          className="form"
          name={`form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}

          <button
            className={`form__submit-btn style-btn ${
              isFormValid ? "" : "form__submit-btn_disabled"
            }`}
            type="submit"
            disabled={isLoadingPopup}
          >
            {isLoadingPopup ? `${titleBtn}...` : titleBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
