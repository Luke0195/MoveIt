
import {createContext, useState, ReactNode} from 'react';
import mocks from '../mocks/challenges.json'

interface ChallengeData{
   type: 'body' | 'eye'
   description:string;
   ammount: number;
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
  
  function levelUp(){
    setLevel(level + 1 );
  }

  function startNewChallenge(){
    const randomChallengesIndex = Math.floor( Math.random() * mocks.length);
    const challenge = mocks[randomChallengesIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenges(){
    setActiveChallenge(null)
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
      experienceToNextLevel
      }
      }>
     {children}
    </ChallengesContext.Provider>
  )
}