import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unlockPOS, resetUserPin } from '../store/authSlice';

export const LockScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);
  
  // Recovery State
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1); // 1 = Manager Auth, 2 = Set New PIN
  const [managerPin, setManagerPin] = useState('');
  const [newPin, setNewPin] = useState('');

  useEffect(() => {
    // Force focus on mount
    inputRef.current?.focus();
    
    // Trap focus inside the lock screen
    const handleKeyDown = (e) => {
      // Prevent tabbing out
      if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Re-focus input whenever mode or step changes
    inputRef.current?.focus();
    setPin('');
    setManagerPin('');
    setNewPin('');
    setError('');
  }, [recoveryMode, recoveryStep]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    inputRef.current?.focus();
  };

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    if (!pin) return;

    dispatch(unlockPOS({ pin }));

    setTimeout(() => {
      const validPin = auth.userPins?.[auth.currentUser] || (auth.currentUser === 'morning' ? '1234' : '567890');
      if (pin !== validPin) {
        setError('Invalid PIN. Please try again.');
        triggerShake();
        setPin('');
      }
    }, 50);
  };

  const handleManagerAuthSubmit = (e) => {
    e.preventDefault();
    if (!managerPin) return;

    // Mock verification for Manager PIN (9999)
    if (managerPin === '9999') {
      setRecoveryStep(2);
      setError('');
    } else {
      setError('Invalid Manager PIN.');
      triggerShake();
      setManagerPin('');
    }
  };

  const handleNewPinSubmit = (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setError('PIN must be at least 4 digits.');
      triggerShake();
      return;
    }

    dispatch(resetUserPin({ user: auth.currentUser, newPin }));
    // Auto-unlocking is handled inside the slice if needed, or we just close recovery
    setRecoveryMode(false);
    setRecoveryStep(1);
    setPin(newPin); // Set the newly created pin to standard input for a seamless unlock
  };

  const handlePinChange = (setter) => (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
    if (value.length <= 6) {
      setter(value);
      setError('');
    }
  };

  // Block ALL mouse events from propagating to the underlying app
  const blockInteraction = (e) => {
    e.stopPropagation();
  };

  const cancelRecovery = () => {
    setRecoveryMode(false);
    setRecoveryStep(1);
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#32324d] flex flex-col items-center justify-center select-none"
      onMouseDown={blockInteraction}
      onClick={blockInteraction}
      onKeyDown={blockInteraction}
    >
      <div className="absolute top-[10%] w-[600px] h-[600px] bg-[#ffb01d]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[32px] shadow-2xl flex flex-col items-center w-full max-w-[420px] relative z-10 transition-all">
        
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={recoveryMode ? "#6366f1" : "#ffb01d"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             {recoveryMode ? (
               <>
                 <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                 <circle cx="16.5" cy="7.5" r=".5"></circle>
               </>
             ) : (
               <>
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                 <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
               </>
             )}
           </svg>
        </div>

        <h1 className="text-[28px] font-black text-white mb-2 text-center">
          {recoveryMode ? 'PIN Recovery' : "Anna's Kitchen"}
        </h1>
        <p className="text-[16px] font-medium text-white/70 mb-1 text-center">
          {recoveryMode 
            ? (recoveryStep === 1 ? 'Manager Authorization Required' : 'Set New PIN') 
            : 'POS Locked'}
        </p>
        
        <div className="flex items-center gap-2 mb-8 bg-black/20 px-4 py-2 rounded-full border border-white/10">
          <span className={`text-[14px] font-bold ${recoveryMode ? 'text-[#6366f1]' : 'text-[#ffb01d]'}`}>
            {auth.shiftName || 'Cashier'}
          </span>
        </div>

        {!recoveryMode && (
          <form onSubmit={handleStandardSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 relative">
              <input 
                ref={inputRef}
                type="password" 
                value={pin}
                onChange={handlePinChange(setPin)}
                className={`w-full h-[64px] bg-white/5 border-2 ${error ? 'border-[#f24343]' : 'border-white/20'} rounded-[16px] px-6 text-[28px] font-black text-center text-white tracking-[0.5em] outline-none focus:border-[#ffb01d] focus:bg-white/10 transition-all placeholder:tracking-normal placeholder:text-[16px] placeholder:text-white/30 placeholder:font-medium ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                placeholder="Enter PIN"
                autoComplete="off"
              />
            </div>

            <div className="h-[24px]">
              {error && <p className="text-[#ff7b7b] text-[14px] font-bold text-center">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={pin.length < 4}
              className="w-full h-[56px] bg-[#ffb01d] hover:bg-[#e59e1a] disabled:bg-white/10 disabled:text-white/30 text-white rounded-[16px] text-[18px] font-bold mt-2 shadow-[0_4px_12px_rgba(255,176,29,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Unlock POS
            </button>
            
            <button 
              type="button"
              onClick={() => setRecoveryMode(true)}
              className="mt-2 text-white/50 hover:text-white/80 text-[14px] font-semibold transition-colors"
            >
              Forgot PIN?
            </button>
          </form>
        )}

        {recoveryMode && recoveryStep === 1 && (
          <form onSubmit={handleManagerAuthSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 relative">
              <input 
                ref={inputRef}
                type="password" 
                value={managerPin}
                onChange={handlePinChange(setManagerPin)}
                className={`w-full h-[64px] bg-white/5 border-2 ${error ? 'border-[#f24343]' : 'border-white/20'} rounded-[16px] px-6 text-[28px] font-black text-center text-white tracking-[0.5em] outline-none focus:border-[#6366f1] focus:bg-white/10 transition-all placeholder:tracking-normal placeholder:text-[16px] placeholder:text-white/30 placeholder:font-medium ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                placeholder="Manager PIN"
                autoComplete="off"
              />
            </div>

            <div className="h-[24px]">
              {error && <p className="text-[#ff7b7b] text-[14px] font-bold text-center">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={managerPin.length < 4}
              className="w-full h-[56px] bg-[#6366f1] hover:bg-[#4f46e5] disabled:bg-white/10 disabled:text-white/30 text-white rounded-[16px] text-[18px] font-bold mt-2 shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Authorize Reset
            </button>
            
            <button 
              type="button"
              onClick={cancelRecovery}
              className="mt-2 text-white/50 hover:text-white/80 text-[14px] font-semibold transition-colors"
            >
              Cancel
            </button>
          </form>
        )}

        {recoveryMode && recoveryStep === 2 && (
          <form onSubmit={handleNewPinSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 relative">
              <input 
                ref={inputRef}
                type="password" 
                value={newPin}
                onChange={handlePinChange(setNewPin)}
                className={`w-full h-[64px] bg-white/5 border-2 ${error ? 'border-[#f24343]' : 'border-white/20'} rounded-[16px] px-6 text-[28px] font-black text-center text-white tracking-[0.5em] outline-none focus:border-[#22c55e] focus:bg-white/10 transition-all placeholder:tracking-normal placeholder:text-[16px] placeholder:text-white/30 placeholder:font-medium ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                placeholder="Enter New PIN"
                autoComplete="off"
              />
            </div>

            <div className="h-[24px]">
              {error && <p className="text-[#ff7b7b] text-[14px] font-bold text-center">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={newPin.length < 4}
              className="w-full h-[56px] bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-white/10 disabled:text-white/30 text-white rounded-[16px] text-[18px] font-bold mt-2 shadow-[0_4px_12px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Confirm & Save
            </button>
            
            <button 
              type="button"
              onClick={cancelRecovery}
              className="mt-2 text-white/50 hover:text-white/80 text-[14px] font-semibold transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
        
        <div className="mt-8 text-center text-white/40 text-[12px] font-semibold">
          {recoveryMode && recoveryStep === 1 
            ? "Mock Manager PIN: 9999" 
            : `Mock PIN: ${auth.userPins?.[auth.currentUser] || (auth.currentUser === 'morning' ? '1234' : '567890')}`}
        </div>
      </div>

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};
