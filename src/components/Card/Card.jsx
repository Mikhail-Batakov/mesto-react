export default function Card({ card, onCardClick}) {
  return(
    <li className="place">
      <img
        src={card.link}
        alt={card.name} 
        className="place__image" 
        onClick={() => onCardClick({link: card.link, name: card.name})} 

        />
      <div className="place__info">
        <h2 className="place__title"> {card.name} </h2>
        <div className="place__like-container">
          <button
            className="place__like-btn style-btn"
            type="button"
            aria-label="Лайк"
          />
          <span className="place__likes-number" />
        </div>
      </div>
      <button
        className="place__delete-btn style-btn"
        type="button"
        aria-label="Корзина"
      />
    </li> 
  )
}

