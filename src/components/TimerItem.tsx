import { Flex } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { Timer, useTimer } from '../contexts/timers/Provider';
import { msToDayTime, msToTime } from '../helpers/helpers';

import DeleteTimerFormModal from './Delete-timer-form-modal';
import TimerStyles, { Style } from './TimerStyles';

export interface TimerItemProps {
  timer: Timer;
}

export default function TimerItem({ timer }: TimerItemProps) {
  const { delTimer } = useTimer();
  const [show, setShow] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<number>(timer.timer);
  const [timeforTimer, setTimeforTimer] = useState<number>(0);
  const [time, setTime] = useState<string>(msToTime(currentTimer));
  const intervalId = useRef(null);

  useEffect(() => {
    if (!timeforTimer) {
      if (timer.variant === 'VarTime') {
        setTime(msToTime(currentTimer));
      } else if (timer.variant === 'VarDateTime') {
        setTime(msToDayTime(currentTimer));
      }
    }
    if (timeforTimer && time !== '00:00:00' && timeforTimer && time !== '00:00:00:00') {
      intervalId.current = setInterval(() => {
        const timeMs = timeforTimer - Date.parse(String(new Date()));
        if (timeMs === 0) stop();
        if (timer.variant === 'VarTime') {
          setTime(msToTime(timeMs));
        } else if (timer.variant === 'VarDateTime') {
          setTime(msToDayTime(timeMs));
        }
      }, 1000);
    }
  }, [timeforTimer]);

  const start = () => {
    const deadline = currentTimer + Date.parse(String(new Date()));
    setTimeforTimer(deadline);
  };

  const stop = () => {
    setTimeforTimer(0);
    setCurrentTimer(timeforTimer - Date.parse(String(new Date())));
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
  };

  const onDelete = () => {
    delTimer(timer.id);
    const timersLocalStorage = JSON.parse(localStorage.getItem('timers') || '');
    localStorage.setItem(
      'timers',
      JSON.stringify(timersLocalStorage.filter((t: Timer) => t.id !== timer.id))
    );
    setShow(false);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <TimerStyles style={Style[timer.style as keyof typeof Style]}>
        <p className="text-4xl text-center ">{time}</p>
        <p className="text-xl  basis-80 grow">{timer.name}</p>

        <Flex
          gap="small"
          align="center"
        >
          <button
            className=" px-3 py-1 bg-slate-50 border-2 rounded-2xl border-gray-600 text-sm font-medium transition duration-250 eease-in hover:border-transparent hover:bg-green-600 hover:text-slate-50"
            type="button"
            onClick={start}
          >
            Start
          </button>
          <button
            className=" px-3 py-1 bg-slate-50 border-2 rounded-2xl border-gray-600 text-sm font-medium transition duration-250 eease-in hover:border-transparent hover:bg-orange-400 hover:text-slate-50"
            type="button"
            onClick={stop}
          >
            Stop
          </button>
          <button
            type="button"
            className="h-8 px-3 py-1 bg-slate-50 rounded-2xl text-sm font-medium border-2 border-gray-600 transition duration-250 eease-in hover:border-transparent hover:bg-red-500 hover:text-slate-50"
            onClick={() => setShow(true)}
          >
            Delete
          </button>
        </Flex>
      </TimerStyles>
      <DeleteTimerFormModal
        onDelete={onDelete}
        show={show}
        onClose={onClose}
        handleClose={onClose}
      />
    </>
  );
}
