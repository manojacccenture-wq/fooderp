import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unlockPOS } from '../../store/slices/authSlice';

export const LockScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pin) return;

    // We dispatch the unlock action
    dispatch(unlockPOS({ pin }));

    // We use a small timeout to let the store update. If still locked, it was invalid.
    setTimeout(() => {
      // Wait, we can't easily check the state directly inside the timeout without referencing the latest state.
      // But we can check auth.currentUser valid pin here (mocking frontend check for UX)
      const validPin = auth.currentUser === 'morning' ? '1234' : '567890';
      if (pin !== validPin) {
        setError('Invalid PIN. Please try again.');
        setIsShaking(true);
        setPin('');
        setTimeout(() => setIsShaking(false), 500);
        inputRef.current?.focus();
      }
    }, 50);
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
    if (value.length <= 6) {
      setPin(value);
      setError('');
    }
  };

  // Block ALL mouse events from propagating to the underlying app
  const blockInteraction = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#32324d] flex flex-col items-center justify-center select-none"
      onMouseDown={blockInteraction}
      onClick={blockInteraction}
      onKeyDown={blockInteraction}
    >
      <div className="absolute top-[10%] w-[600px] h-[600px] bg-[#ffb01d]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[32px] shadow-2xl flex flex-col items-center w-full max-w-[420px] relative z-10">
        
        <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffb01d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
             <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
           </svg>
        </div>

        <h1 className="text-[28px] font-black text-white mb-2 text-center">Anna's Kitchen</h1>
        <p className="text-[16px] font-medium text-white/70 mb-1 text-center">POS Locked</p>
        
        <div className="flex items-center gap-2 mb-8 bg-black/20 px-4 py-2 rounded-full border border-white/10">
          <span className="text-[14px] font-bold text-[#ffb01d]">{auth.shiftName || 'Cashier'}</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 relative">
            <input 
              ref={inputRef}
              type="password" 
              value={pin}
              onChange={handlePinChange}
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
        </form>
        
        <div className="mt-8 text-center text-white/40 text-[12px] font-semibold">
          Mock PIN: {auth.currentUser === 'morning' ? '1234' : '567890'}
        </div>
      </div>

      {/* Embedded CSS for shake animation */}
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
