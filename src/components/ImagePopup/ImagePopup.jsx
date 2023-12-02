import usePopupCloser from "../../utils/hooks/usePopupCloser";

export default function ImagePopup({ card, isOpen, onClose }) {

  usePopupCloser(isOpen, onClose)

  return (
    <div className={`popup popup_type_zoom ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <button
          className="popup__close-btn popup__close-btn_type_zoom style-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <figure className="popup__figure-zoom">
          <img src={card.link} alt={card.name} className="popup__zoom-img" />
          <figcaption className="popup__zoom-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
