/* eslint-disable no-unused-vars */

import React from 'react';
import styles from '../styles/home.module.css';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './WebSocketProvider';

const Home = () => {
  const { socketRef, _message } = useWebSocket();
  const navigate = useNavigate();

  const movebtn = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: "start" }));
    }
    navigate('/Game');
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to Mahjong Game</h1>
      <button onClick={movebtn} className={styles.start_button}>Game Start</button>
    </div>
  );
};

export default Home;
