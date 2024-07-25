"use client"

import Typing from "@/components/typing";
import { score } from '@/types/score';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Home() {

  const [scores, setScores] = useState<score[]>([])
  const [myscores, setMyScores] = useState<score[]>([])

  const newScore = (score: score) => {
    setMyScores([...myscores, score])
    fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(score)
    })    
  }

  useEffect(() => {
    fetch('/api/scores')
      .then(res => res.json())
      .then(data => {
        setScores(data.scores)
      })
  }, [])


  const Stats = dynamic(
    () => import('../components/stats'),
    { ssr: false }
  )

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Typing newScore={newScore}/>
      <Stats scores={scores} myscores={myscores} />
    </main>
  );
}
