import "../ItemCard/ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";

function ItemCard({ data, onCardClick, handleCardLike, currentUser }) {
  const isLiked = data.likes?.some(id => id === currentUser?._id);
  const likesCount = data.likes?.length || 0;

  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLike(e) {
    e.stopPropagation();
    handleCardLike(data, isLiked);
  }

  return (
    <>
      <li className="card">
        <div className="card__header">
          <h2 className="card__title">{data.name}</h2>
          <button 
            className={`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`}
            onClick={handleLike}
            type="button"
          >
            <img src={likeBtn} alt="like" className="card__like-icon" />
            <span className="card__likes-count">{likesCount}</span>
          </button>
        </div>
        <img
          src={data.imageUrl}
          alt={data.name}
          className="card__image"
          onClick={handleOpenCard}
        />
      </li>
    </>
  );
}

export default ItemCard;
