//import logo from './logo.svg';
//import './App.css';
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import { useState, useEffect } from "react";

function App() {
//стейт переменные попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelCardPopupOpen, setDelCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
//стейт переменные котекста 
const [currentUser, setCurrentUser] = useState({});
//стейт переменные карточек
const [cards, setCards] = useState([]);
const [isLoadingCards, setIsLoadingCards] = useState(true);

const [delCardId, setDelCardId] = useState('');


function handleCardLike(card) {
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

  // useEffect(() => {
  //   const handleEscClose = (event) => {
  //     if (event.key === 'Escape') {
  //       closeAllPopups();
  //     }
  //   };

  //   const handleOverlayClick = (event) => {
  //     if (event.target.classList.contains('popup')) {
  //       closeAllPopups();
  //     }
  //   };

  //   document.addEventListener('keydown', handleEscClose);
  //   document.addEventListener('click', handleOverlayClick);

  //   return () => {
  //     document.removeEventListener('keydown', handleEscClose);
  //     document.removeEventListener('click', handleOverlayClick);
  //   };
  // }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);

  }

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
    setIsImagePopup(false);
    setDelCardPopupOpen(false);

  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);

  }

  function handleDelCardClick(cardId) { ///
    setDelCardId(cardId)
    setDelCardPopupOpen(true);

  }

  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);


        setCards(cardData);
        setIsLoadingCards(false);
      })   
      .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));

  }, [])

  function handleCardDel(evt) {
    evt.preventDefault()
    setIsLoadingPopup(true)
    api.deleteCard(delCardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== delCardId));
        closeAllPopups()
        setIsLoadingPopup(false)
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`)); //

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onEditProfile = { handleEditProfileClick }
          onAddPlace = { handleAddPlaceClick }
          onEditAvatar = { handleEditAvatarClick }
          onDelCard = { handleDelCardClick }
          onCardClick = { handleCardClick }
          cards = { cards }
          isLoading = { isLoadingCards }

          onCardLike={handleCardLike}
          
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
          isOpen={ isDelCardPopupOpen }
          onClose={ closeAllPopups }
          onSubmit = { handleCardDel }
          isLoadingPopup = { isLoadingPopup }
        
        />

        {/* popup zoom */}

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}

        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
