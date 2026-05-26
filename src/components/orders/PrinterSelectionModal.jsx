import React, { useState, useEffect } from 'react';
import { findAvailablePrinters } from '../../services/printService';

export const PrinterSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadPrinters();
    }
  }, [isOpen]);

  const loadPrinters = async () => {
    setLoading(true);
    setError(null);
    try {
      const availablePrinters = await findAvailablePrinters();
      setPrinters(availablePrinters);
      if (availablePrinters.length > 0) {
        setSelectedPrinter(availablePrinters[0]);
      } else {
        setError('No printers found. Please ensure your printer is connected and QZ Tray is running.');
      }
    } catch (err) {
      setError('Failed to fetch printers. Make sure QZ Tray is installed and running.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedPrinter) {
      localStorage.setItem('preferred_printer', selectedPrinter);
      onSelect(selectedPrinter);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-[24px] w-[400px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative animate-in fade-in zoom-in duration-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#f3f5f9] shrink-0">
          <h2 className="text-[20px] font-bold text-[#32324d]">Select Printer</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8e8ea9] hover:text-[#32324d] transition-colors bg-[#f3f5f9] rounded-full hover:bg-[#eaeaef]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#ffb01d] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[#8e8ea9] text-[14px] font-semibold">Finding available printers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-[#e23744] text-[14px] font-semibold mb-4">{error}</p>
              <button 
                onClick={loadPrinters}
                className="px-4 py-2 bg-[#f3f5f9] text-[#32324d] font-bold rounded-[12px] hover:bg-[#eaeaef] transition-colors text-[14px]"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-[#8e8ea9] text-[14px] font-semibold">Select your default receipt printer. This will be saved for future silent printing.</p>
              
              <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                {printers.map((printer) => (
                  <label 
                    key={printer}
                    className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-colors ${
                      selectedPrinter === printer 
                        ? 'border-[#ffb01d] bg-[#fff7e8]' 
                        : 'border-[#eaeaef] hover:bg-[#f3f5f9]'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="printer" 
                      value={printer}
                      checked={selectedPrinter === printer}
                      onChange={(e) => setSelectedPrinter(e.target.value)}
                      className="accent-[#ffb01d] w-4 h-4"
                    />
                    <span className="text-[14px] font-bold text-[#32324d]">{printer}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#eaeaef] flex gap-4 shrink-0 bg-[#fafbfc]">
          <button 
            onClick={onClose}
            className="flex-1 h-[48px] bg-white border border-[#eaeaef] text-[#4a4a6a] font-bold rounded-[16px] text-[15px] hover:bg-[#f3f5f9] transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!selectedPrinter || loading}
            className="flex-1 h-[48px] bg-[#ffb01d] text-white font-bold rounded-[16px] text-[15px] shadow-[0px_4px_20px_0px_rgba(255,176,29,0.3)] hover:bg-[#ffb01d]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
