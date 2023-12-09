import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Spinner from "../Spinner/Spinner.jsx";
//import { PacmanLoader } from "react-spinners";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelCard,
  cards,
  isLoading,
  onCardLike,
  isLoggedIn
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="main">
      {/* profile */}
      <section className="profile" aria-label="Профиль">
        <button
          className="profile__avatar-btn style-btn"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <img
            src={avatar || "#"}
            alt="Аватар профиля"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{name || ""}</h1>
            <button
              className="profile__edit-btn style-btn"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__job">{about || ""}</p>
        </div>
        <button
          className="profile__add-btn style-btn"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      {/* places */}
      <section className="places" aria-label="Места">
        <ul className="places__content">
          {isLoading ? (
            <Spinner />
          ) : (
            cards &&
            cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onDelCard={onDelCard}
                onCardLike={onCardLike}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
