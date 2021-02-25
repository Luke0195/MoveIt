import {useContext} from 'react'
import styles from '../../styles/components/Profile.module.css'
import {ChallengesContext} from '../../contexts/ChallengesContext';
export default function Profile(){
  const {level} = useContext(ChallengesContext)
   return(
     <div className={styles.profileContainer}>
       <img src="https://github.com/Luke0195.png" alt="Foto do usuário"/>
       <div>
         <strong> Lucas Santos </strong>
         <p>
           <img src="icons/level.svg" alt="icone de leve up"/>
            Level {level}</p>
       </div>
     </div>
   )
}