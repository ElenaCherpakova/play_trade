"use client";
import { useState, useEffect, use } from "react";

// Custom hook for countdown timer interval
export function useCountdown(initialTime, onEnd) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft === 0) {
          onEnd();
          return 0;
        } else {
          return timeLeft - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEnd]);
  return timeLeft;
}
