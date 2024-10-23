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

  // 从外部 API 获取数据
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12') // 获取 12 个 Pokemon 数据
      .then((response) => response.json())
      .then((data) => {
        // 将数据转换为我们需要的格式，并存入 cards 状态
        const fetchedCards = data.results.map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setCards(fetchedCards); // 设置卡片数据
      });
  }, []); // 仅在组件挂载时执行一次

  // 随机排列卡片的函数
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5); // 使用随机函数打乱卡片顺序
  };

  // 卡片点击处理函数
  const handleCardClick = (id) => {
    // 如果卡片已经被点击过，游戏重置
    if (clickedCards.includes(id)) {
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
