import styles from '../../styles/components/LevelUpModal.module.css';
import {useContext} from 'react'
import {ChallengesContext} from '../../contexts/ChallengesContext'
export default function  LevelUpModal(){
  const {level, closeModal} = useContext(ChallengesContext);
  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header> {level} </header>
        <strong> Parabéns </strong>
        <p> Você alcançou o um novo level </p>
        <button type="button" onClick={closeModal}> <img src="/icons/close.svg" alt="Close Icon "/> </button>
      </div>
    </div>
  )
}