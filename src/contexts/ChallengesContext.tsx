
import {createContext, useState, ReactNode, useEffect} from 'react';
import mocks from '../mocks/challenges.json'

interface ChallengeData{
   type: 'body' | 'eye'
   description:string;
   amount: number;
}
interface ChallengesContextData{
  experienceToNextLevel:number;
  level : number,
  levelUp:() => void, 
  currentExperience: number, 
  challengesCompleted: number, 
  startNewChallenge:  () => void;
  activeChallenge:ChallengeData;
  resetChallenges: () => void;
  completeChallenge: () => void;
}

interface ChallengesProvider{
  children: ReactNode;
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData);

export function ChallengesProvider({children}){
  const [level, setLevel ] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2)
  

  useEffect(() => {
    Notification.requestPermission();
  },[])

  
  function levelUp(){
    setLevel(level + 1 );
    new Audio('/level_up.mp3').play();
    new Notification('Level Up! 🎉 ', {
      body: `Vc subiu para o nivel ${level}`
    })
  }

  function startNewChallenge(){
    const randomChallengesIndex = Math.floor( Math.random() * mocks.length);
    const challenge = mocks[randomChallengesIndex];
    setActiveChallenge(challenge);
    
    new  Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo Desafio 🎉', {
        body:`Valendo ${challenge.amount}XP!`
      })
    }
  }

  function resetChallenges(){
    setActiveChallenge(null)
  }

  function completeChallenge(){
    if(!activeChallenge){
      return
    }
    const {amount }  = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience > experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null)
    setChallengeCompleted(challengesCompleted + 1)

  }
  return(
    <ChallengesContext.Provider value={
      {level,
       levelUp, 
       currentExperience, 
       challengesCompleted, 
       startNewChallenge,
      activeChallenge,
      resetChallenges,
      experienceToNextLevel,
      completeChallenge
    }
      }>
     {children}
    </ChallengesContext.Provider>
  )
}