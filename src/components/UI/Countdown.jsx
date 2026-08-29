import React, { useEffect, useState } from "react";

const getRemaining = (expiryDate) => {
  const diff = expiryDate - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

const Countdown = ({ expiryDate }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  if (!expiryDate) return null;
  const remaining = getRemaining(expiryDate);
  if (!remaining) return null;

  let label = `${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`;
  if (remaining.days > 0) label = `${remaining.days}d ${label}`;

  return <div className="de_countdown">{label}</div>;
};

export default Countdown;
