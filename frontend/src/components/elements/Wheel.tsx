'use client'
// components/Roulette.tsx
import React, { useState, useCallback, useEffect } from 'react';
import styles from '../styles/Roulette.module.css';


const DEGREES_PER_SLOT = 360 / 37; // 9.729729...

const CENTER_OFFSET = DEGREES_PER_SLOT / 2;

const ROULETTE_NUMBERS = [
  0, 29, 32, 1, 24, 19, 12, 31, 22, 3, 28, 21, 10, 5, 20, 7, 30, 23, 8, 9, 
  18, 11, 26, 35, 6, 25, 34, 13, 16, 15, 4, 27, 36, 33, 14, 17, 2
];

const BASE_IMAGE_OFFSET = 128.0; 

const FINE_TUNE_OFFSET = 0.0; 
const BALL_DURATION = 6000; 

// 画像
const LAYER_1 = '/roulette_1.png';
const LAYER_2 = '/roulette_3.png';
const LAYER_3_WHEEL = '/roulette_2.png';
const LAYER_4 = '/roulette_4.png';
// ----------------------------------------------------

const Roulette: React.FC = () => {
  const [rotation, setRotation] = useState(0); 
  const [targetRotation, setTargetRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isBallVisible, setIsBallVisible] = useState(false);
  const [isBallMovingIn, setIsBallMovingIn] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null); 
  
  useEffect(() => {
    let innerMoveTimer: NodeJS.Timeout | null = null;
    let finalStopTimer: NodeJS.Timeout | null = null;

    if (isSpinning) {

      const innerMoveStartTime = BALL_DURATION * 0.4; 

      innerMoveTimer = setTimeout(() => {
          setIsBallMovingIn(true); 
      }, innerMoveStartTime);

      finalStopTimer = setTimeout(() => {
        setIsSpinning(false); 

      }, BALL_DURATION); 
    }

    return () => {
        if (innerMoveTimer) clearTimeout(innerMoveTimer);
        if (finalStopTimer) clearTimeout(finalStopTimer);
    };
  }, [isSpinning]);


  const spinRoulette = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsBallVisible(true); 
    setIsBallMovingIn(false); 
    setWinningNumber(null); 

    const spins = 15; // 周回数

    const winningSlot = Math.floor(Math.random() * 37); 
    

    const winningIndex = ROULETTE_NUMBERS.indexOf(winningSlot);
    if (winningIndex === -1) {
        console.error(`Error: Winning slot ${winningSlot} not found in array.`);
        setIsSpinning(false);
        return; 
    }
    

    const angleForIndex = winningIndex * DEGREES_PER_SLOT;
    const baseStopAngle = 360 - angleForIndex; // 反時計回りの基本回転量
    
    let adjustedStopPosition = baseStopAngle - CENTER_OFFSET + BASE_IMAGE_OFFSET; 
    
    //　微調整オフセットを加える 
    adjustedStopPosition += FINE_TUNE_OFFSET;
    
    // 総回転量を計算
    // 現在の角度 + (周回数 * 360) + 停止位置
    const newTotalRotation = rotation + (360 * spins) + adjustedStopPosition;
    
    setRotation(newTotalRotation);
    setTargetRotation(newTotalRotation); 
    

    setWinningNumber(winningSlot);
    console.log(`スピン開始。目標ナンバー: ${winningSlot} (インデックス: ${winningIndex})`);
    
  }, [isSpinning, rotation]); 

  const outerRadius = '200px'; 
  const innerRadius = '95px'; 
  //ここでは回転半径を設定
  const ballRadius = !isBallMovingIn ? outerRadius : innerRadius;
  // ホイールの回転角度は rotation、ボールの回転角度は currentAngle
  const currentAngle = isSpinning ? targetRotation : rotation; 

  return (
    <div className={styles.rouletteContainer}>
      <img src={LAYER_1} alt="Roulette Base" className={styles.layer1} />
      {/* Layer 3: ホイール本体 - 反時計回りに回転 */}
      <img
        src={LAYER_3_WHEEL}
        alt="Roulette Wheel"
        className={styles.layer3Wheel}
        style={{ transform: `rotate(-${rotation}deg)` }} 
      />
      {/* Layer 2: ホイールと一緒に回転するパーツ */}
      <img 
        src={LAYER_2} 
        alt="Roulette Shadow" 
        className={styles.layer2} 
        style={{ transform: `rotate(-${rotation}deg)` }} 
      />
      {/* Layer 4: ホイールと一緒に回転する中央パーツ */}
      <img 
        src={LAYER_4} 
        alt="Roulette Center" 
        className={styles.layer4}
        style={{ transform: `rotate(-${rotation}deg)` }} 
      />
      
      {/* ボール: 時計回りに回転し、ホイールに対して相対的に静止/移動 */}
      <div 
        className={`${styles.rouletteBall} ${!isBallVisible && styles.hidden} `}
        style={{ 
          // currentAngleはホイールの回転量(rotation)と同じ。
          // ボール自体は時計回りに回転(rotate(currentAngle)deg)、ホイールは反時計回り(-rotation)
          // これにより、ボールは回転するホイールに対して相対的に静止し、固定された位置に見える
          transform: `translate(-50%, -50%) rotate(${currentAngle}deg) translateX(${ballRadius})`
        }}
      />
      
      <button 
        className={styles.spinButton} 
        onClick={spinRoulette}
        disabled={isSpinning}
      >
        {isSpinning ? 'SPINNING...' : 'Spin'}
      </button>

      {winningNumber !== null && !isSpinning && (
        <div className={styles.winningResult}>
          <p>🎉 **当たりました！** 🎉</p>
          <p>勝利ナンバー: <strong>{winningNumber}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Roulette;