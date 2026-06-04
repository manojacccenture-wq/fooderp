import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { lockPOS } from '../../store/slices/authSlice';
import { LockScreen } from './LockScreen';

export const LockScreenWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  
  // Provide a safe fallback if state is stale from hot-reload
  const isAuthenticated = authState.isAuthenticated;
  const isLocked = authState.isLocked;
  const autoLockTimeout = authState.autoLockTimeout ?? 15; 
  
  const timerRef = useRef(null);

  // Auto-lock inactivity timer logic
  useEffect(() => {
    if (!isAuthenticated || isLocked || autoLockTimeout === 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // autoLockTimeout is in minutes, convert to milliseconds
      timerRef.current = setTimeout(() => {
        dispatch(lockPOS());
      }, autoLockTimeout * 60 * 1000);
    };

    // Initialize timer
    resetTimer();

    // Listen to user activity to reset timer
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetTimer();
    };

    activityEvents.forEach(event => document.addEventListener(event, handleActivity));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach(event => document.removeEventListener(event, handleActivity));
    };
  }, [isAuthenticated, isLocked, autoLockTimeout, dispatch]);

  // Global Keyboard Shortcut (CTRL + SHIFT + L or WIN + SHIFT + L)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // e.metaKey represents the Windows key (or Command key on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault(); // Prevent browser default (if any)
        if (isAuthenticated && !isLocked) {
          dispatch(lockPOS());
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, isLocked, dispatch]);

  return (
    <>
      {children}
      {isAuthenticated && isLocked && <LockScreen />}
    </>
  );
};
