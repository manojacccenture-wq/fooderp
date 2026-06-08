import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStartShift } from '../store/authSlice';
import { authService } from '../services/authService';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Opening Cash Flow state
  const [showOpeningCash, setShowOpeningCash] = useState(false);
  const [validatedUser, setValidatedUser] = useState(null);
  const [openingCash, setOpeningCash] = useState('');
  
  // Store tokens temporarily until shift is started
  const [authTokens, setAuthTokens] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await authService.performLogin(username, password);
      
      if (result.success) {
        // Fallback for demo shift name assignment based on username if needed
        const shiftName = username.toLowerCase().includes('evening') ? 'Evening Shift' : 'Morning Shift';
        
        setValidatedUser({ id: username, name: shiftName });
        setAuthTokens({
          accessToken: result.accessToken,
          tokenType: result.tokenType,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn,
        });
        
        setShowOpeningCash(true);
      } else {
        setError(result.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartShift = (e) => {
    e.preventDefault();
    if (openingCash === '') return;

    dispatch(loginStartShift({
      user: validatedUser.id,
      shiftName: validatedUser.name,
      openingCash: Number(openingCash),
      tokens: authTokens,
    }));

    navigate('/dashboard/menu', { replace: true });
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafc] flex items-center justify-center p-6 relative overflow-x-hidden overflow-y-auto">
      {/* Decorative background shapes mimicking POS style */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#ffb01d]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#ffb01d]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white w-full max-w-[400px] rounded-[24px] shadow-2xl border border-[#eaeaef] overflow-hidden z-10 relative">
        <div className="px-8 py-10 flex flex-col items-center">
          
          <div className="w-[60px] h-[60px] bg-[#fff7e8] rounded-[16px] flex items-center justify-center mb-6 shadow-sm border border-[#ffb01d]/20">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffb01d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <path d="M16 10a4 4 0 0 1-8 0"></path>
             </svg>
          </div>

          {!showOpeningCash ? (
            <>
              <h1 className="text-[24px] font-black text-[#32324d] mb-2 text-center leading-tight">Cashier Login</h1>
              <p className="text-[14px] font-medium text-[#8e8ea9] mb-8 text-center">Enter your credentials to access the POS</p>

              <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#8e8ea9] uppercase tracking-wider">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-[48px] bg-[#f8faff] border border-[#eaeaef] rounded-[12px] px-4 text-[15px] font-semibold text-[#32324d] outline-none focus:border-[#ffb01d] focus:ring-2 focus:ring-[#ffb01d]/20 transition-all placeholder:font-medium placeholder:text-[#c0c0cf]"
                    placeholder="e.g. morning"
                    autoFocus
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#8e8ea9] uppercase tracking-wider">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[48px] bg-[#f8faff] border border-[#eaeaef] rounded-[12px] px-4 text-[15px] font-semibold text-[#32324d] outline-none focus:border-[#ffb01d] focus:ring-2 focus:ring-[#ffb01d]/20 transition-all placeholder:font-medium placeholder:text-[#c0c0cf]"
                    placeholder="••••••••"
                  />
                </div>

                {error && <p className="text-[#f24343] text-[13px] font-semibold text-center mt-2">{error}</p>}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-[48px] rounded-[12px] text-[16px] font-bold mt-4 shadow-[0_4px_12px_rgba(255,176,29,0.3)] transition-all flex items-center justify-center ${
                    isLoading ? 'bg-[#ffb01d]/70 cursor-not-allowed text-white/90' : 'bg-[#ffb01d] hover:bg-[#e59e1a] text-white'
                  }`}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="mt-4 p-4 bg-[#fff7e8] border border-[#ffb01d]/20 rounded-[12px] flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#ffb01d] uppercase tracking-wider text-center">Demo Credentials</span>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-semibold text-[#8e8ea9]">Morning Shift:</span>
                    <span className="font-bold text-[#32324d]">morning / 1234</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-semibold text-[#8e8ea9]">Evening Shift:</span>
                    <span className="font-bold text-[#32324d]">evening / 1234</span>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-black text-[#32324d] mb-2 text-center leading-tight">Shift Opening</h1>
              <p className="text-[14px] font-medium text-[#8e8ea9] mb-8 text-center">
                Cashier: <span className="font-bold text-[#ffb01d]">{validatedUser.name}</span>
              </p>

              <form onSubmit={handleStartShift} className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-center gap-3">
                  <label className="text-[12px] font-bold text-[#8e8ea9] uppercase tracking-wider text-center">Opening Cash Amount</label>
                  <div className="relative w-full max-w-[200px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-black text-[#8e8ea9]">₹</span>
                    <input 
                      type="number" 
                      value={openingCash}
                      onChange={(e) => setOpeningCash(e.target.value)}
                      className="w-full h-[64px] bg-[#f8faff] border-2 border-[#eaeaef] rounded-[16px] pl-10 pr-4 text-[24px] font-black text-[#32324d] text-center outline-none focus:border-[#ffb01d] focus:ring-4 focus:ring-[#ffb01d]/10 transition-all"
                      placeholder="0"
                      autoFocus
                      required
                      min="0"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-[48px] bg-[#24a44b] hover:bg-[#209444] text-white rounded-[12px] text-[16px] font-bold mt-2 shadow-[0_4px_12px_rgba(36,164,75,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  Start Shift
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
