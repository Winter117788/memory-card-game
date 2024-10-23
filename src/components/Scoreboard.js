import React from 'react';
import '../Scoreboard.css';

// 计分板组件
const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      <p>当前得分: {score}</p>
      <p>最佳得分: {bestScore}</p>
    </div>
  );
};

export default Scoreboard;
