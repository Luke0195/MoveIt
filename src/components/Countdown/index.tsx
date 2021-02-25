import {  useContext } from 'react';
import {CountDownContext} from '../../contexts/CountdownContext'; 
import styles from '../../styles/components/Countdown.module.css';





export default function Countdown(){
  const {
    hasFinished
    ,isActive,
    minutes,
    resetCountdown,
    seconds,
    startCountdown} = useContext(CountDownContext)
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')// Adicionar
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')
  
  
  return(
  <div>
    <div className={styles.countdownContainer}>
      <div>
        <span> {minuteLeft}</span>
        <span> {minuteRight}</span>
      </div>  
      <span> :</span>
      <div>
        <span> {secondsLeft} </span>
        <span> {secondsRight} </span>
      </div> 
    </div>

    {hasFinished ? (
      <button 
      disabled
      className={styles.countdownButton}> Ciclo encerrado
      <img src="icons/check.svg" alt="icone de check"/>
      </button> 
    ): (
    <>
      {isActive ? (
        <button type="button"
        onClick={resetCountdown}
        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}> Abandonar Ciclo
        
        </button> 
        

        )
        :(
        <button type="button"
        onClick={startCountdown}
        className={styles.countdownButton}> Iniciar Ciclo</button>
      )}
    </>
    )}
    </div>
  )
}