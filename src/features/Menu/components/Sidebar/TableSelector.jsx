import React from 'react';
import { getOrderStatusStyles, determineTableStatus } from '../../../../shared/utils/orderStatus';
import clsx from 'clsx';

export const TableSelector = ({
  orderType,
  allTables,
  isDineInFlow,
  selectedTable,
  setSelectedTable
}) => {
  if (orderType !== 'dine_in') return null;

  return (
    <div className="px-4 mt-6">
      <div className="flex flex-wrap gap-4">
        {allTables.map((table) => {
          const num = table.tableNo;
          const tableStatus = determineTableStatus(table);
          const tableStyle = getOrderStatusStyles(tableStatus);
          const isAvailable = table.status === 'available';
          const isDisabled = isDineInFlow ? (num !== selectedTable) : !isAvailable;

          return (
            <button
              key={num}
              disabled={isDisabled}
              onClick={() => !isDisabled && setSelectedTable(num)}
              className={clsx(
                "relative flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shrink-0 bg-white",
                selectedTable === num ? "scale-[1.05] z-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : "hover:scale-[1.02]"
              )}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '16px',
                border: selectedTable === num ? `2.5px solid ${tableStyle.text}` : `1.5px solid ${tableStyle.border}`,
                backgroundColor: selectedTable === num ? `${tableStyle.text}10` : '#ffffff', // adding slight tint
              }}
            >
              <span style={{ 
                color: tableStyle.text,
                fontSize: '15px',
                fontWeight: selectedTable === num ? 800 : 600
              }}>
                {num}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

