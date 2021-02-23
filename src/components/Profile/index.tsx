import styles from '../../styles/components/Profile.module.css'
export default function Profile(){
   return(
     <div className={styles.profileContainer}>
       <img src="https://github.com/Luke0195.png" alt="Foto do usuário"/>
       <div>
         <strong> Lucas Santos </strong>
         <p>
           <img src="icons/level.svg" alt="icone de leve up"/>
            Level 1</p>
       </div>
     </div>
   )
}