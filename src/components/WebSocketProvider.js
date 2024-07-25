import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket('wss://mahjong-hhlab-07dea4f0b85c.herokuapp.com/ws/game/');
    socketRef.current = websocket;

    const onMessage = (event) => {
      // console.log('onMessage', event.data);
      setMessage(event.data);
    };
    websocket.addEventListener('message', onMessage);

    return () => {
      // websocket.close();
      // websocket.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socketRef, message }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
