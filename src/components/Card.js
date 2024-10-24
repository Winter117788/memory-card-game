import React from 'react';
import '../Card.css';

// 单张卡片组件
const Card = ({ card, handleCardClick }) => {
  return (
    <div className="card" onClick={() => handleCardClick(card.id, card.name)}>
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
};

export default Card;
