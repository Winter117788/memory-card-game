import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import './App.css';

// 主组件 App
const App = () => {
  // 定义状态变量
  const [cards, setCards] = useState([]); // 储存卡片数据
  const [score, setScore] = useState(0); // 当前得分
  const [bestScore, setBestScore] = useState(0); // 最佳得分
  const [clickedCards, setClickedCards] = useState([]); // 记录已点击的卡片

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=72')
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the Pokémon list
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selectedCards = shuffled.slice(0, 12).map((item) => {
          // Extract the Pokémon ID from the URL
          const pokemonId = item.url.split('/').filter(Boolean).pop();
          return {
            id: pokemonId,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          };
        });
        setCards(selectedCards);
      });
  }, []);
  

  // 随机排列卡片的函数
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5); // 使用随机函数打乱卡片顺序
  };

  // 卡片点击处理函数
  const handleCardClick = (id, name) => {
    // 如果卡片已经被点击过，游戏重置
    if (clickedCards.includes(id)) {
      alert(`不好意思，${name} 已经点击过了！`); // Show the message with the Pokémon name
      setScore(0); // 当前得分重置
      setClickedCards([]); // 重置点击卡片记录
    } else {
      // 未点击过的卡片，得分增加
      const newScore = score + 1;
      setScore(newScore); // 更新当前得分
      setBestScore(Math.max(newScore, bestScore)); // 更新最佳得分（取最大值）

      // 添加卡片到已点击列表并打乱卡片顺序
      setClickedCards([...clickedCards, id]);
      setCards(shuffleCards([...cards]));

      if (clickedCards.length + 1 === cards.length){
        alert(`你赢了！你点击了所有的不同的${cards.length}张卡牌`)
        setScore(0);
        setClickedCards([]);
      }
    }
  };

  return (
    <div className="App">
      {/* 渲染计分板 */}
      <Scoreboard score={score} bestScore={bestScore} />
      {/* 渲染卡片 */}
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;