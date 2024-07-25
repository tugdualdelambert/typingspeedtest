"use client"

import { useEffect, useState } from "react";

export default function UseTimer() {
  const [counter, setCounter] = useState(0);
  const [stop, setStop] = useState(true)
  const resetCounter = () => {
    setCounter(60);
    setStop(false)
  }

  // Third Attempts
  useEffect(() => {
    if (counter === 0 || stop === true) {
      return;
    }
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    
    return () => clearInterval(timer);
  }, [counter]);

  return {counter, resetCounter, setStop};
}
