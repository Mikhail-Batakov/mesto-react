import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import { useState, useEffect } from "react";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

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

  function handleDelCardClick(cardId) {
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


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
  
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка при установке лайка ${error}`));
  }

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

  function handleUpdateUser(userData, resetForm) {
    setIsLoadingPopup(true)
    api.sendUserInfo(userData)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        resetForm()
        setIsLoadingPopup(false)
      })
      .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`));

  }

  function handleUpdateAvatar(userData, resetForm) {
    setIsLoadingPopup(true)
    api.setUserAvatar(userData)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        resetForm()
        setIsLoadingPopup(false)
      })
      .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`));
  }

  function handleAddPlaceSubmit(cardData,resetForm) {
    setIsLoadingPopup(true)
    api.sendNewCardInfo(cardData) 
      .then((newCard) => {
        console.log(newCard)
        setCards([newCard, ...cards])
        closeAllPopups()
        resetForm()
      })
      .catch((error) => console.error(`Ошибка при добавлении новой карточки ${error}`))
      .finally(() => {setIsLoadingPopup(false)})
      
  }

  // useEffect(() => {
  //   function handleEsc(evt) {
  //     if (evt.key === 'Escape') {
  //       closeAllPopups();
        
  //     }
  //   }
  
  //   function handleOverlayClick(evt) {
  //     if (evt.target.classList.contains('popup_opened')) {
  //       closeAllPopups();
        
  //     }
  //   }
  
  //   if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
  //     document.addEventListener('keydown', handleEsc);
  //     document.addEventListener('mousedown', handleOverlayClick);
  //   }
  
  //   return () => {
  //     document.removeEventListener('keydown', handleEsc);
  //     document.removeEventListener('mousedown', handleOverlayClick);
  //   };
  // }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

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
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser = {handleUpdateUser}
          isLoadingPopup = {isLoadingPopup}
        />
        
        {/* попап добавления нового места */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
          isLoadingPopup = {isLoadingPopup}
        
        />
        
        {/* попап редактирования аватара */} 
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
          isLoadingPopup = {isLoadingPopup}
        
        />

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