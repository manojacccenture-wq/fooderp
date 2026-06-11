import React, { useState, useEffect } from 'react';
import { TableCard } from '../components/TableCard/TableCard';

export const TableSelectionView = ({ 
  isActive, 
  onCancel, 
  tables, 
  currentTableNo, 
  onConfirm,
  selectionMode = 'single' // 'single' | 'multiple'
}) => {
  const [selectedTables, setSelectedTables] = useState([]);

  // Reset selection when view becomes active
  useEffect(() => {
    if (isActive) {
      setSelectedTables([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  const availableTables = tables.filter(t => t.status === 'Empty');

  const toggleSelection = (tableNo) => {
    if (selectionMode === 'single') {
      setSelectedTables([tableNo]);
    } else {
      setSelectedTables(prev => 
        prev.includes(tableNo) 
          ? prev.filter(t => t !== tableNo)
          : [...prev, tableNo]
      );
    }
  };

  const handleConfirm = () => {
    if (selectedTables.length > 0) {
      // For single select, return the first item. For multiple, return the array.
      onConfirm(currentTableNo, selectionMode === 'single' ? selectedTables[0] : selectedTables);
      onCancel(); // Close view
    }
  };

  const titlePrefix = selectionMode === 'single' ? 'Change Table for Table' : 'Merge Table for Table';

  return (
    <div className="flex flex-col animate-in fade-in duration-200">
      <h1 className="text-[18px] font-bold text-[#666687] mb-[31px]">
        {titlePrefix} {currentTableNo}
      </h1>
      
      <div className="grid grid-cols-3 gap-x-[34px] gap-y-[31px]">
        {availableTables.map((table) => {
          const isSelected = selectedTables.includes(table.tableNo);
          return (
            <div 
              key={table.id}
              onClick={() => toggleSelection(table.tableNo)}
              className="cursor-pointer transition-all duration-200 relative hover:scale-[0.98]"
            >
              <div className="pointer-events-none">
                <TableCard
                  tableNo={table.tableNo}
                  status={table.status}
                  isSelected={isSelected}
                  minimalView={true}
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
          disabled={selectedTables.length === 0}
          className="px-6 py-3 bg-[#ffb01d] text-white rounded-[12px] font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffb01d]/90 transition-colors"
        >
          {selectionMode === 'single' ? 'Confirm Change' : 'Confirm Merge'}
        </button>
      </div>
    </div>
  );
};


