import { useState, useEffect } from "react";

/**
 * Custom hook that triggers a periodic rerender of a component based on a condition.
 *
 * This hook sets up an interval that updates the component's state with the current
 * timestamp at the specified interval duration, causing the component to rerender.
 * The interval is cleared when the component unmounts or when the condition changes to false.
 *
 * @param {*} condition - condition to start the periodic rerender
 * @param {*} intervalDuration - duration of the interval in milliseconds
 */
const usePeriodicRerender = (condition: boolean, intervalDuration: number) => {
  const [_, setTime] = useState<number>();

  useEffect(() => {
    if (!condition) {
      return;
    }

    const interval = setInterval(() => {
      setTime(Date.now());
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [condition, intervalDuration]);
};

export { usePeriodicRerender };
