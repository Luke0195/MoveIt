import { createContext, ReactNode, useState, useContext, useEffect} from "react";
import {ChallengesContext} from './ChallengesContext'
interface CountDownContextData{
  minutes: number;
  seconds : number;
  hasFinished :boolean;
  isActive: boolean;
  startCountdown:() => void;
  resetCountdown:() => void;
       

}

interface CountDownProviderProps{
  children: ReactNode;
}


export const CountDownContext = createContext({} as CountDownContextData)

let countdownTimeout:NodeJS.Timeout;


export function CountdownProvider({children}: CountDownProviderProps){

  const {startNewChallenge} = useContext(ChallengesContext)
  const [time , setTime]= useState(0.1* 60)
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [hasFinished, setHasFineshed] = useState(false)
  const minutes = Math.floor(time / 60);
  const seconds =  time % 60;

  function startCountdown(){
    setIsStarted((prevState) => !prevState );
     setIsActive(true)
    }
  
    function resetCountdown(){
      clearTimeout(countdownTimeout);
      setIsActive(false)
      setTime(0.6 * 60);
      setHasFineshed(false)
    }
  
    useEffect(() =>{
     if(isActive && time > 0){
      countdownTimeout= setTimeout(() =>{
         setTime(time - 1)
       }, 1000)
     } else if (isActive && time === 0){
       setHasFineshed(true)
       setIsActive(false)
       startNewChallenge()
     }
  
    },[isActive, time])
  
   return(
     <CountDownContext.Provider value={{
       minutes,
       seconds,
       hasFinished,
       isActive,
       startCountdown,
       resetCountdown,
       
       }}>
       {children}
     </CountDownContext.Provider>
   )
}