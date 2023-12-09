import usePopupCloser from "../../utils/hooks/usePopupCloser";
import iconOk from "../../images/iconOk.svg";
import iconErr from "../../images/iconErr.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  usePopupCloser(isOpen, onClose);

  return (
    <div
      className={`popup popup_type_info-tooltip ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_info-tooltip">
        <button
          className="popup__close-btn style-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__icon"
          src={isSuccess ? iconOk : iconErr}
          alt={`Иконка ${
            isSuccess ? "успешной" : "ошибки при"
          } регистрации на сайте`}
        />
        <h3 className="popup__title popup__title_type_info-tooltip">
          {isSuccess
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h3>
      </div>
    </div>
  );
}
