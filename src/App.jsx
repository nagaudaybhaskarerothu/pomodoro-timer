import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(3000);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
    if (isRunning === false || count <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCount((previousCount) => previousCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, isRunning]);

  const handleStart = () => {
    if (count > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning((previousState) => !previousState);
  };

  const handleBreak = () => {
    setIsRunning(false);
    setMode('break');
    setCount(600);
  };

  const handleFocus = () => {
    setIsRunning(false);
    setMode('focus');
    setCount(50);
  };

  const handleReset = () => {
    setIsRunning(false);

    if (mode === 'break') {
      setCount(600);
    } else {
      setCount(3000);
    }
  };

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  const formattedTime =
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0');

  const totalTime = mode === 'break' ? 600 : 3000;

  const progress = ((totalTime - count) / totalTime) * 100;

  return (
    <div className="app">
      <main className="timer-card">
        <div className="top-section">
          <span className="app-label">FOCUS FLOW</span>
          <span className={`status ${isRunning ? 'running' : ''}`}>
            <span className="status-dot"></span>
            {isRunning ? 'In progress' : 'Ready to focus'}
          </span>
        </div>

        <h1>Pomodoro Timer</h1>

        <p className="subtitle">
          One task at a time. Make every minute count.
        </p>

        <div className="mode-buttons">
          <button
            className={mode === 'focus' ? 'mode-btn active' : 'mode-btn'}
            onClick={handleFocus}
          >
            Focus
          </button>

          <button
            className={mode === 'break' ? 'mode-btn active' : 'mode-btn'}
            onClick={handleBreak}
          >
            Short Break
          </button>
        </div>

        <div className="timer-circle">
          <div className="timer-inner">
            <span className="timer-icon">
              {mode === 'focus' ? '🎯' : '☕'}
            </span>

            <h2>{formattedTime}</h2>

            <p>{mode === 'focus' ? 'FOCUS SESSION' : 'BREAK TIME'}</p>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-labels">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="control-buttons">
          <button
            className="primary-btn"
            onClick={handleStart}
            disabled={isRunning || count === 0}
          >
            ▶ {count === 0 ? 'Completed' : 'Start'}
          </button>

          <button
            className="secondary-btn"
            onClick={handlePause}
            disabled={count === 0}
          >
            {isRunning ? 'Ⅱ Pause' : '▶ Resume'}
          </button>

          <button
            className="reset-btn"
            onClick={handleReset}
            aria-label="Reset timer"
          >
            ↻
          </button>
        </div>

        <div className="bottom-note">
          <span>✦</span>
          {mode === 'focus'
            ? 'Stay focused. You are making progress.'
            : 'Take a breath. You deserve a break.'}
        </div>
      </main>
    </div>
  );
}