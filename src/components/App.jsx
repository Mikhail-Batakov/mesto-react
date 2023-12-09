import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import InfoToolTip from "./InfoTooltip/InfoTooltip.jsx";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { authorize, getContent, register } from "../utils/auth.js";
import React from "react";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelCardPopupOpen, setDelCardPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [delCardId, setDelCardId] = useState("");

  const [isSuccess, setIsSuccess] = useState(false); // успешная регистрация
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
        setIsLoadingCards(false);
      })
      .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setDelCardPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopup(true);
  };

  const handleDelCardClick = (cardId) => {
    setDelCardId(cardId);
    setDelCardPopupOpen(true);
  };

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
    evt.preventDefault();
    setIsLoadingPopup(true);
    api
      .deleteCard(delCardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== delCardId));
        closeAllPopups();
        setIsLoadingPopup(false);
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => setIsLoadingPopup(false));
  }

  function handleSubmit(
    request,
    resetForm,
    errorMessage = "Ошибка при выполнении запроса"
  ) {
    setIsLoadingPopup(true);
    request()
      .then(() => {
        closeAllPopups();
        if (resetForm) {
          resetForm();
        }
      })
      .catch((error) => console.error(`${errorMessage} ${error}`))
      .finally(() => setIsLoadingPopup(false));
  }

  function handleUpdateUser(userData, resetForm) {
    handleSubmit(
      () => api.sendUserInfo(userData).then((res) => setCurrentUser(res)),
      resetForm,
      "Ошибка при редактировании профиля"
    );
  }

  function handleUpdateAvatar(userData, resetForm) {
    handleSubmit(
      () => api.setUserAvatar(userData).then((res) => setCurrentUser(res)),
      resetForm,
      "Ошибка при редактировании аватара"
    );
  }

  function handleAddPlaceSubmit(cardData, resetForm) {
    handleSubmit(
      () =>
        api
          .sendNewCardInfo(cardData)
          .then((newCard) => setCards([newCard, ...cards])),
      resetForm,
      "Ошибка при добавлении новой карточки"
    );
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      getContent(jwtToken)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error(`Ошибка при повторном входе ${err}`);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  function onRegister(password, email) {
    setIsLoadingCards(true);
    register(password, email)
      .then((res) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        console.error(`Ошибка при регистрации пользователя ${err}`);
      })
      .finally(() => setIsLoadingCards(false));
  }

  function onLogin(password, email) {
    setIsLoadingCards(true);
    authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка при авторизации пользователя ${err}`);
      })
      .finally(() => setIsLoadingCards(false));
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onDelCard={handleDelCardClick}
                onCardClick={handleCardClick}
                cards={cards}
                isLoading={isLoadingCards}
                onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/sign-up"
            element={
              <Register onRegister={onRegister} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={onLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingPopup={isLoadingPopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingPopup={isLoadingPopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingPopup={isLoadingPopup}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          titleBtn="Да"
          isOpen={isDelCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDel}
          isLoadingPopup={isLoadingPopup}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
