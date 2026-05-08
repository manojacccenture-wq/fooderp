import React, { useState } from 'react';
import { TableCard } from '../../components/cards/TableCard/TableCard';

// Sample table data
const tableData = [
  // Available tables
  { id: 1, number: '01', variant: 'available' },
  { id: 4, number: '04', variant: 'available' },
  { id: 7, number: '07', variant: 'available' },
  { id: 10, number: '10', variant: 'available' },
  
  // Occupied tables
  { id: 2, number: '02', variant: 'occupied', amount: '450', guests: 4, timer: '25 min' },
  { id: 5, number: '05', variant: 'occupied', amount: '450', guests: 4, timer: '25 min' },
  { id: 8, number: '08', variant: 'occupied', amount: '450', guests: 4, timer: '25 min' },
  { id: 11, number: '11', variant: 'occupied', amount: '450', guests: 4, timer: '25 min' },
  
  // Reserved tables
  { id: 3, number: '03', variant: 'reserved', guests: 4 },
  { id: 6, number: '06', variant: 'reserved', guests: 4 },
  { id: 9, number: '09', variant: 'reserved', guests: 4 },
  { id: 12, number: '12', variant: 'reserved', guests: 4 },
];

export const DineInPage = () => {
  const availableTables = tableData.filter(t => t.variant === 'available').length;

  const handleBookTable = (tableNumber) => {
    console.log(`Book table ${tableNumber}`);
  };

  const handleCompleteOrder = (tableNumber) => {
    console.log(`Complete order for table ${tableNumber}`);
  };

  const handleStartOrder = (tableNumber) => {
    console.log(`Start order for table ${tableNumber}`);
  };

  const handleCancel = (tableNumber) => {
    console.log(`Cancel table ${tableNumber}`);
  };

  const handleActionMenuSelect = (tableNumber, action) => {
    console.log(`Action ${action} for table ${tableNumber}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Page Title Section */}
        <h1 className="text-heading-4 text-[var(--color-neutral-900)] mb-8">
          Top Number of Table ({availableTables})
        </h1>

        {/* Table Grid */}
        <div className="grid grid-cols-3 gap-[34px] auto-rows-max">
          {tableData.map((table) => (
            <div key={table.id} className="flex justify-center">
              <TableCard
                tableNumber={table.number}
                variant={table.variant}
                amount={table.amount}
                guests={table.guests}
                timer={table.timer}
                onBookTable={() => handleBookTable(table.number)}
                onCompleteOrder={() => handleCompleteOrder(table.number)}
                onStartOrder={() => handleStartOrder(table.number)}
                onCancel={() => handleCancel(table.number)}
                onActionMenuSelect={(action) => handleActionMenuSelect(table.number, action)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
