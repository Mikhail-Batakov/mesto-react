import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDelCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeBtnClassName = `place__like-btn style-btn ${
    isLiked && "place__like-btn_active"
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="place">
      <img
        src={card.link}
        alt={card.name}
        className="place__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="place__info">
        <h2 className="place__title"> {card.name} </h2>
        <div className="place__like-container">
          <button
            className={cardLikeBtnClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="place__likes-number">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="place__delete-btn style-btn"
          type="button"
          aria-label="Корзина"
          onClick={() => onDelCard(card._id)}
        />
      )}
    </li>
  );
}
