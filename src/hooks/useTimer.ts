import moment from "moment";
import { useEffect, useState } from "react";

type TimerT = {
  format: string;
};

/**
 * Custom hook to create a timer that updates every second.
 *
 * @param {TimerT} props - The properties for the timer.
 * @param {string} props.format - The format in which the time should be displayed.
 * @returns {Object} The current time formatted as per the provided format.
 * @returns {string} time - The current time formatted according to the given format.
 */
const useTimer = (props: TimerT) => {
  const { format: dateFormat } = props;

  const [time, setTime] = useState(moment().format(dateFormat));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(dateFormat));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dateFormat]);

  return {
    time,
  };
};

export default useTimer;
