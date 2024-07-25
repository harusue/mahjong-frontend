import React, { useState, useEffect } from 'react';
import styles from '../styles/game.module.css';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './WebSocketProvider';

const Game = () => {
  const { socketRef, message } = useWebSocket();
  const [tilesArray, setTilesArray] = useState([]);
  const [tsumoTile, setTsumoTile] = useState(null);
  const [kawaTiles1, setKawaTile1] = useState([]);
  const [kawaTiles2, setKawaTile2] = useState([]);
  const [reachAble, setReachAble] = useState(false);
  const [ronAble, setRonAble] = useState(false);
  const [tsumoAble, setTsumoAble] = useState(false);

  const navigate = useNavigate();

  // メッセージが受信された場合に配列を取り出す
  useEffect(() => {
    if (message) {
      try {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.tiles) {
          setTilesArray(parsedMessage.tiles);
        }
        if (parsedMessage.tsumo) {
          setTsumoTile(parsedMessage.tsumo);
        }
        if (parsedMessage.kawa1) {
          setKawaTile1(parsedMessage.kawa1)
        }
        if (parsedMessage.kawa2) {
          setKawaTile2(parsedMessage.kawa2)
        }
        if (parsedMessage.reach_able) {
          setReachAble(parsedMessage.reach_able)
        }
        if (parsedMessage.ron_able) {
          setRonAble(parsedMessage.ron_able)
        }
        if (parsedMessage.tsumo_able) {
          setTsumoAble(parsedMessage.tsumo_able)
        }
        if (parsedMessage.message === 'start') {
          console.log(parsedMessage.yama);
        }
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    }
  }, [message]);
  // console.log("reachAble: " + reachAble);

  // 麻雀牌に変換する関数
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

  // ボタンのクリックハンドラ
  // const handleClick = (index, isTsumo = false) => {
  //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
  //     const tileToDiscard = isTsumo ? tsumoTile : tilesArray[index];
  //     socketRef.current.send(JSON.stringify({ message: "discard", tile: tileToDiscard, reach:reachState }));
  //     reachState = false;
  //   }
  //   if (isTsumo) {
  //     setTsumoTile(null);
  //   } else {
  //     setTilesArray(prevTiles => prevTiles.filter((_, i) => i !== index));
  //   }
  // };

   const handleClick = (index, isTsumoGiri = false) => {
    console.log(socketRef.current.readyState);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const tileToDiscard = isTsumoGiri ? tsumoTile : tilesArray[index];
      console.log("tile to discard" + tileToDiscard);
      socketRef.current.send(JSON.stringify({ message: "discard", tile: tileToDiscard, reach:reachState }));
      reachState = false;
    }
  };

  let reachState = false;

  const handleReachClick = () => {
    reachState = true;
  };

  const handleRonClick = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({message: 'end', type: 'ron'}))
    }
    navigate('/result')
  }

  const handleTsumoClick = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({message: 'end', type: 'tsumo'}))
    }
    navigate('/result')
  }


  // tilesArrayをループしてボタンを作成
  const tileButtons = tilesArray.map((tile, index) => {
    const mahjongTile = getMahjongTile(tile);
    return (
      <button key={index} onClick={() => handleClick(index)} className={styles.tileButton}>
        <img className={styles.tileImg} src={mahjongTile} alt={mahjongTile} />
      </button>
    );
  });

  const tsumoButton = tsumoTile !== null ? (
    <button onClick={() => handleClick(null, true)} className={styles.tileButton}>
      <img className={styles.tileImg} src={getMahjongTile(tsumoTile)} alt={getMahjongTile(tsumoTile)} />
    </button>
  ) : null;

  const kawaButtons1 = kawaTiles1.map((tile, index) => {
    const mahjongTile = getMahjongTile(tile);
    return (
      // <button key={index} className={styles.kawaButton}>
      <div className={styles.kawaTile}>
        <img className={styles.kawaTileImg} src={mahjongTile} alt={mahjongTile} />
      </div>
      // </button>
    );
  });

  const kawaButtons2 = kawaTiles2.map((tile, index) => {
    const mahjongTile = getMahjongTile(tile);
    return (
      // <button key={index} className={styles.kawaButton}>
      <div className={styles.kawaTile}>
        <img className={styles.kawaTileImg} src={mahjongTile} alt={mahjongTile} />
      </div>
      // </button>
    );
  });

  const reachButton = reachAble ? (
    <button onClick={handleReachClick} className={styles.reachButton}>
      リーチ
    </button>
  ) : null;

  const ronButton = ronAble ? (
    <button onClick={handleRonClick} className={styles.reachButton}>
      ロン
    </button>
  ) : null;

  const tsumoWinButton = tsumoAble ? (
    <button onClick={handleTsumoClick} className={styles.reachButton}>
      ツモ
    </button>
  ) : null;

  

  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Game Page</h1>
      <div className={styles.kawaContainer}>
        {kawaButtons2}
      </div>
      <div className={styles.kawaContainer}>
        {kawaButtons1}
      </div>
      <div>
        {tileButtons}
        {tsumoButton}
        {reachButton}
        {ronButton}
        {tsumoWinButton}
      </div>
    </div>
  );
};

export default Game;
