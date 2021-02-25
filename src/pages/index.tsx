
import ExperienceBar from "../components/ExperienceBar";
import Profile from '../components/Profile';
import CompleteChallenges from '../components/CompleteChallenges';
import CountDown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox'


import Head from 'next/head';

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from "../contexts/CountdownContext";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Move it</title>
      </Head>
    <ExperienceBar/>
    <CountdownProvider>

    <section >
      <div>
        <Profile/>
        <CompleteChallenges/>
        <CountDown/>
      </div>
      <div>
        <ChallengeBox/>
      </div>
    </section>
    </CountdownProvider>
    
   </div>
  )
}
