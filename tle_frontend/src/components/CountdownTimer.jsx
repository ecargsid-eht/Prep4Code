// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ contestStartDate }) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const timeDiff = new Date(contestStartDate) - now;

            if (timeDiff < 0) {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        };

        calculateTimeRemaining();
        const timerInterval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(timerInterval);
    }, [contestStartDate]);

    return (
        <div>
            <p>{timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
        </div>
    );
};

export default CountdownTimer;