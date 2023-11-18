export default function PopupWithForm({name, title, titleBtn, children, isOpen, onClose}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
      <div className="popup__container">
        <button
          className="popup__close-btn popup__close-btn_type_edit-profile style-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form className="form" name="form-profile" noValidate="">
          {children}
    
          <button className="form__submit-btn style-btn" type="submit">
            {titleBtn}
          </button>
        </form>
      </div>
    </div>


  )

}