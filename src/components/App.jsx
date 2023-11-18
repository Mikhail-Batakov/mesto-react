//import logo from './logo.svg';
//import './App.css';
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
console.log(selectedCard);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);

  }

  // function handleAddPlaceClick() {
  //   setIsAddPlacePopupOpen(true);

  // }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);

  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false)


  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)


  }

  // handleDelCard = () => {

  // }

  // handleCard = () => {

  // }


  return (
    <div className="page">

      <Header />

      <Main
        onEditProfile = { handleEditProfileClick }
        onAddPlace = { handleAddPlaceClick }
        onEditAvatar = { handleEditAvatarClick }
        onCardClick = { handleCardClick}
      
      
      />

      <Footer />

      {/* попап редактирования профиля */}
      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        titleBtn='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label" htmlFor="username">
          <input
            id="username"
            className="form__input form__input_type_name"
            name="username"
            minLength={2}
            maxLength={40}
            type="text"
            required=""
            placeholder="Ваше имя"
          />
          <span className="form__span-error username-error" />
        </label>
        <label className="form__label" htmlFor="job">
          <input
            id="job"
            className="form__input form__input_type_job"
            name="job"
            minLength={2}
            maxLength={200}
            type="text"
            required=""
            placeholder="О вас"
          />
          <span className="form__span-error job-error" />
        </label>

      </PopupWithForm>
      
      {/* попап добавления нового места */}
      <PopupWithForm
        name='add-place'
        title='Новое место'
        titleBtn='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label" htmlFor="name">
          <input
            id="name"
            className="form__input form__input_type_place-name"
            name="name"
            minLength={2}
            maxLength={30}
            type="text"
            required=""
            placeholder="Название"
          />
          <span className="form__span-error name-error" />
        </label>
        <label className="form__label" htmlFor="link">
          <input
            id="link"
            className="form__input form__input_type_place-link"
            name="link"
            type="url"
            required=""
            placeholder="Ссылка на картинку"
          />
          <span className="form__span-error link-error" />
        </label>

      </PopupWithForm>
      
      {/* попап редактирования аватара */} 
      <PopupWithForm 
        name='edit-avatar'
        title='Обновить аватар'
        titleBtn='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label" htmlFor="avatar">
          <input
            id="avatar"
            className="form__input form__input_type_avatar-link"
            name="avatar"
            type="url"
            required=""
            placeholder="Ссылка на картинку"
          />
          <span className="form__span-error avatar-error" />
        </label>

      </PopupWithForm>

      {/* попап удаления карточки */}
      <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
        titleBtn='Да'
      
      />

      {/* popup zoom */}

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}


      
      
      
      />

    
    </div>

  );
}

export default App;
