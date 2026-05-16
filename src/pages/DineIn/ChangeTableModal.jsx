import React, { useState, useEffect } from 'react';
import { TableCard } from '../../components/cards/TableCard/TableCard';

export const ChangeTableModal = ({ isOpen, onClose, tables, currentTableNo, onConfirm }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTable(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const availableTables = tables.filter(t => t.status === 'available');

  const handleConfirm = () => {
    if (selectedTable) {
      onConfirm(currentTableNo, selectedTable);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1a4b]/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[26px] p-8 shadow-xl relative animate-in fade-in zoom-in duration-200 w-[947px] max-w-[95vw] max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[31px]">
          <div>
            <h2 className="text-[18px] font-bold text-[#666687] mb-6">Change Table for Table {currentTableNo}</h2>
            <p className="text-[14px] font-medium text-[#8e8ea9] mb-[31px]">Select an available table to switch to:</p>
            
            <div className="grid grid-cols-3 gap-x-[34px] gap-y-[31px]">
              {availableTables.map((table) => {
                const isSelected = selectedTable === table.tableNo;
                return (
                  <div 
                    key={table.id}
                    onClick={() => setSelectedTable(table.tableNo)}
                    className="cursor-pointer transition-all duration-200 relative hover:scale-[0.98]"
                  >
                    <div className="pointer-events-none">
                      <TableCard
                        tableNo={table.tableNo}
                        status={table.status}
                        isSelected={isSelected}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#eaeaef] mt-4">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-[12px] text-[#8e8ea9] font-bold hover:bg-[#f6f6f9] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={!selectedTable}
              className="px-6 py-3 bg-[#ffb01d] text-white rounded-[12px] font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffb01d]/90 transition-colors"
            >
              Confirm Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
