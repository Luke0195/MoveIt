import {useContext} from 'react'
import {ChallengesContext} from '../../contexts/ChallengesContext'
import styles from '../../styles/components/ChallengeBox.module.css'
export default function  ChallengeBox(){

  const {activeChallenge, resetChallenges} = useContext(ChallengesContext)
  return(
    <>
      <div className={styles.challengeBoxContainer}>
       {activeChallenge  ? (
        <div className={styles.challengeActive}>
         
          <header> Ganhe {activeChallenge.ammount} xp  </header>
         
          <main>
            <img src={`icons/${activeChallenge.type}.svg`}alt="icone do desafio"/>
            <strong> Novo Desafio </strong>
            <p> {activeChallenge.description}</p>
          </main>
          
          <footer>
            <button
             type="button"
             className={styles.challengeFailedButton}
             onClick={resetChallenges}
             
            > Falhei </button>
            <button
              type="button"
              className={styles.challengeSucessededButton}
            > Completei  </button>
          </footer>
       
        </div>
       ) :(
        <div  className={styles.challengeNotActive}>
          <strong> Finalize um ciclo para receber um desafio  </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de leve completando desafios.
          </p>
        </div>


       )}

      </div>
    </>
  )
}