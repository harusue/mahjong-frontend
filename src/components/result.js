/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import styles from '../styles/result.module.css';
import { useWebSocket } from './WebSocketProvider';

const Result = () => {
  const { _, message } = useWebSocket();
  const [tilesArray, setTilesArray] = useState([]);
  const [yaku, setYaku] = useState([]);
  const [han, setHan] = useState(0);
  const [fu, setFu] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (message) {
      try {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.tiles) {
          setTilesArray(parsedMessage.tiles);
        }
        if (parsedMessage.yaku) {
          setYaku(parsedMessage.yaku);
        }
        if (parsedMessage.han) {
          setHan(parsedMessage.han);
        }
        if (parsedMessage.fu) {
          setFu(parsedMessage.fu);
        }
        if (parsedMessage.score) {
          setScore(parsedMessage.score);
        }
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    }
  }, [message]);

  const getMahjongTile = (number) => {
    const tileTypes = ['m.svg', 'p.svg', 's.svg'];
    const zihai = ['1z.svg', '2z.svg', '3z.svg', '4z.svg', '5z.svg', '6z.svg', '7z.svg'];
    const filePath = './mahjong_tiles/';

    if (number >= 0 && number < 36) {
      // 萬子
      return `${filePath}${Math.floor(number / 4) + 1}${tileTypes[0]}`;
    } else if (number >= 36 && number < 72) {
      // 筒子
      return `${filePath}${Math.floor((number - 36) / 4) + 1}${tileTypes[1]}`;
    } else if (number >= 72 && number < 108) {
      // 索子
      return `${filePath}${Math.floor((number - 72) / 4) + 1}${tileTypes[2]}`;
    } else if (number >= 108 && number < 136) {
      // 字牌
      return `${filePath}${zihai[Math.floor((number - 108) / 4) % 7]}`;
    } else {
      return 'Invalid Tile';
    }
  };

  const renderTiles = tilesArray.map((tile, index) => {
    return (
      <img
        src={getMahjongTile(tile)}
        alt='mahjong tile'
        className={styles.tileImg}
      />
    );
  });

  return (
    <div className={styles.result}>
        <h1 className={styles.title}>Result</h1>
        <div className={styles.tilesContainer}>{renderTiles}</div>
        <div className={styles.resultText}>
            <h2>Yaku: {yaku.join(', ')}</h2>
            <h2>Han: {han}</h2>
            <h2>Fu: {fu}</h2>
            <h2>Total: {score}</h2>
        </div>
    </div>
  );
}

export default Result;