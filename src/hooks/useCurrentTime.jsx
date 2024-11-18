import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (currentTime === null) {
      const date = new Date();
      setCurrentTime({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      });
    }
  }, [currentTime]);

  return currentTime;
};

export default useCurrentTime;
