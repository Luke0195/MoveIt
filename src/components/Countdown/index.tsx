import { useState, useEffect } from 'react'
import styles from '../../styles/components/Countdown.module.css';


let countdownTimeout:NodeJS.Timeout;


export default function Countdown(){

  const [time , setTime]= useState(25 * 60)
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds =  time % 60;
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')// Adicionar
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')
  
  function startCountDown(){
  setIsStarted((prevState) => !prevState );
   setIsActive(true)
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false)
  }

  useEffect(() =>{
   if(isActive ?? time > 0){
    countdownTimeout= setTimeout(() =>{
       setTime(time - 1)
     }, 1000)
   } 

  },[isActive, time])
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

    {isActive ? (
      <button type="button"
      onClick={resetCountDown}
      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}> Abandonar Ciclo</button> 
      )
      :(
      <button type="button"
      onClick={startCountDown}
      className={styles.countdownButton}> Iniciar Ciclo</button>
    )}

    </div>
  )
}