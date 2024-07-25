"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import UseTimer from "@/lib/useTimer";
import { score } from "@/types/score";
import { useEffect, useState } from "react";
import selectRandomWords from "@/lib/words";
export default function Typing({ newScore }: { newScore: (score: score) => void }) {
  const [stats, setStats] = useState({ accuracy: 0, speed: 0 })
  const { counter, resetCounter } = UseTimer()
  const [started, setStarted] = useState(false)
  const [text, setText] = useState("Press Start to begin typing.")
  const [input, setInput] = useState("")

  useEffect(() => {
    calculateStats()
  }, [counter])

  const reset = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (e && e.detail == 0) return
    setText(selectRandomWords(120).join(" "))
    setInput("")
    setStats({ accuracy: 0, speed: 0 })
    setStarted(true)
    resetCounter()
  }

  const calculateStats = () => {
    if (started === false) return;

    const speed = Math.round((text.substring(0, input.length).split(" ").length - 1) * (60 / (60 - counter)))
    const goodChar = input.split("").reduce((acc, char, index) => {
      if (char === text[index]) {
        acc++
      }
      return acc
    }, 0)

    const accuracy = input.length === 0 ? 100 : Math.round(goodChar / (input.length) * 100)
    setStats({ accuracy, speed })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.key === "Backspace") {
      setInput(input.slice(0, -1))
      document.removeEventListener('keydown', handleKeyDown, true)
    }
    if (e.key.length === 1 && started === true) {
      setInput(input + e.key)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }

  const drawText = () => {
    const coloredSpans = input.split("").map((char, index) => {
      return <span key={index} className={char === text[index] ? "text-green-500" : "text-red-500"}>{text[index]}</span>
    })
    const cursorSpan = <span className="bg-gray-500 text-gray-100">{text[input.length] || " "}</span>
    const lastSpan = <span className="text-gray-500">{text.slice(input.length + 1)}</span>

    return (
      <>
        {coloredSpans}
        {cursorSpan}
        {lastSpan}
      </>
    )
  }

  useEffect(() => {
    if (counter === 0 && stats.speed > 0 && stats.accuracy > 0 && started === true) {
      setStarted(false)
      newScore({ wpm: stats.speed, accuracy: stats.accuracy })
    }
  }, [counter])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
  }, [input, started])

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.shiftKey === true && e.code === "Space") {
        reset(undefined)
        return
      }
    })
  }, [])

  return (
    <div className="max-w-6xl w-full pt-4 p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center dark:text-gray-200">Typing Speed Test</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">Test your typing speed and accuracy.</p>
      </div>
      <div className="space-y-4">
        <Slider
          defaultValue={[]}
          value={[Math.round(counter / 60 * 100)]}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="bg-gray-100 p-4 rounded-md dark:bg-gray-700">

          <p className="text-gray-700 dark:text-gray-300">
            {drawText()}
          </p>

        </div>
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <div>
            Accuracy:
            <span className="font-medium">{stats.accuracy} %</span>
          </div>
          <div className="flex items-center flex-col">
            <p className="w-full text-center hidden md:block">Shift + space to start</p>
            <Button
              onClick={(e) => reset(e)}
              className="w-full  bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
              {started ? counter : "Start"}
            </Button>
          </div>

          <div>
            Speed:
            <span className="font-medium">{stats.speed} WPM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
