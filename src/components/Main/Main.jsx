import { useEffect, useState } from "react"
import api from "../../utils/api";
import Card from "../Card/Card.jsx";


export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  console.log(cards)


  useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)

      cardData.forEach((element) => {
        element.myId = userData._id
      });
      setCards(cardData)
    })

}, [])

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
          <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-btn style-btn"
              type="button"
              aria-label="Редактировать"
              onClick = {onEditProfile}
            />
          </div>
          <p className="profile__job">{userDescription}</p>
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
          {cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={onCardClick} />
            )
          })}
        </ul>
      </section>
    </main>
  )

}