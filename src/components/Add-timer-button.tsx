import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { lazy, useState } from 'react';

import { useTimer } from '../contexts/timers/Provider';

import { AddTimerInputValues } from './Add-timer-form';
import { timerToMs } from '@/helpers/helpers';

const AddTimerFormModal = lazy(() => import('./Add-timer-form-modal'));

export default function AddTimerButton() {
  const [show, setShow] = useState<boolean>(false);
  const { addTimer } = useTimer();

  const handleAddTimer = (values: AddTimerInputValues) => {
    const id = nanoid();
    let timer;
    if (values.variant === 'VarTime') {
      timer = timerToMs(values.timer);
    }
    if (values.variant === 'VarDateTime') {
      const DateMs = Date.parse(`${values.date} ${values.time}`);
      timer = DateMs - Date.now();
    }

    const currentTimer = { ...values, timer, id };
    addTimer(currentTimer);
    const timersLocalStorage = JSON.parse(localStorage.getItem('timers') || '');
    localStorage.setItem('timers', JSON.stringify([...timersLocalStorage, currentTimer]));
    setShow(false);
  };

  return (
    <>
      <div className="px-5 py-3 mt-3 mb-5 border-b-4 rounded border-gray-600">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setShow(true);
          }}
        >
          Add timer
        </Button>
      </div>
      <AddTimerFormModal
        onSubmit={handleAddTimer}
        show={show}
        onClose={() => setShow(false)}
      />
    </>
  );
}
