import React, { useState, useEffect } from 'react';
import { TableCard } from '../components/TableCard/TableCard';

export const ChangeTableView = ({ isActive, onCancel, tables, currentTableNo, onConfirm }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  // Reset selection when view becomes active
  useEffect(() => {
    if (isActive) {
      setSelectedTable(null);
    }
  }, [isActive]);

  if (!isActive) return null;

  const availableTables = tables.filter(t => t.status === 'Empty');

  const handleConfirm = () => {
    if (selectedTable) {
      onConfirm(currentTableNo, selectedTable);
      onCancel(); // Close view
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-200">
      <h1 className="text-[18px] font-bold text-[#666687] mb-[31px]">
        Top Number of Table ({tables.length})
      </h1>
      
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

      <div className="flex items-center gap-4 mt-[31px]">
        <button 
          onClick={onCancel}
          className="px-6 py-3 rounded-[12px] bg-[#f24343] text-white font-bold hover:bg-[#f24343]/90 transition-colors"
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
  );
};


