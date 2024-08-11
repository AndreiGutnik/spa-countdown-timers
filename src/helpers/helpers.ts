const getPadTime = (time: string) => time.toString().padStart(2, '0');

export const timerToMs = (timer: string): number => {
  const splitTimer: string[] = timer.split(':');
  const hours: number = Number(splitTimer[0]) * 60000 * 60;
  const minutes: number = Number(splitTimer[1]) * 60000;
  const seconds: number = Number(splitTimer[2]) * 1000;
  return hours + minutes + seconds;
};

export const msToTime = (t: number) => {
  const seconds: string = getPadTime(String(Math.floor((t / 1000) % 60)));
  const minutes: string = getPadTime(String(Math.floor((t / 1000 / 60) % 60)));
  const hours: string = getPadTime(String(Math.floor((t / (1000 * 60 * 60)) % 24)));

  return `${hours}:${minutes}:${seconds}`;
};

export const msToDayTime = (t: number) => {
  const seconds: string = getPadTime(String(Math.floor((t / 1000) % 60)));
  const minutes: string = getPadTime(String(Math.floor((t / 1000 / 60) % 60)));
  const hours: string = getPadTime(String(Math.floor((t / (1000 * 60 * 60)) % 24)));
  const days: string = getPadTime(String(Math.floor((t / (1000 * 60 * 60 * 24)) % 24)));

  return `${days}:${hours}:${minutes}:${seconds}`;
};
