import { useState, useEffect } from "react";

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
