import { useContext } from "react"
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Spinner from "../Spinner/Spinner.jsx";
//import { PacmanLoader } from "react-spinners";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelCard, cards, isLoading, onCardLike}) {
  const currentUser = useContext(CurrentUserContext)

  return(
    <main className="main">
      {/* profile */}
      <section className="profile" aria-label="Профиль">
        <button
          className="profile__avatar-btn style-btn"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
          
        >
          <img src={currentUser.avatar || '#'} alt="Аватар профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name || ''}</h1>
            <button
              className="profile__edit-btn style-btn"
              type="button"
              aria-label="Редактировать"
              onClick = {onEditProfile}
            />
          </div>
          <p className="profile__job">{currentUser.about || ''}</p>
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
        
          {isLoading ? <Spinner/> : cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={onCardClick} onDelCard={onDelCard} onCardLike={onCardLike} />
            )
          })}
        </ul>
      </section>
    </main>
  )

}