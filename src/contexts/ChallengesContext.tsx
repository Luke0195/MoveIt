import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie'
import mocks from '../mocks/challenges.json'
import LevelUpModal from '../components/LevelUpModal';

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
  closeModal: () =>void;
}

interface ChallengesProvider{
  children: ReactNode;
  level: number;
  currentExperience:number;
  challengesCompleted:number;
}





export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProvider){
  const [level, setLevel ] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted  ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1 ) * 4, 2)
  


  
  useEffect(() => {
    Notification.requestPermission();
  },[])
  
  useEffect(() =>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted])
  
  function levelUp(){
    setLevel(level + 1 );
    new Audio('/level_up.mp3').play();
    new Notification('Level Up! 🎉 ', {
      body: `Level Up! Você atingiu o nivel ${level}`
    })

    setIsLevelUpModalOpen(true)
  }


  function closeModal(){
    setIsLevelUpModalOpen(false)
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
    const { amount }  = activeChallenge;
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
      completeChallenge,
      closeModal
    }
      }>
     {children}
      {isLevelUpModalOpen && ( <LevelUpModal/>)}
    </ChallengesContext.Provider>
  )
}

// Usamos os cookies para realizar os armazenamento no storaged.