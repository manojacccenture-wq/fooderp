import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCard } from '../../components/cards/TableCard/TableCard';
import { StartOrderModal } from './StartOrderModal';
import { ChangeTableView } from './ChangeTableView';

// Centralized mock data matching exact Figma configuration
const initialTableData = [
  { id: 1, tableNo: "01", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 2, tableNo: "02", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 3, tableNo: "03", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 4, tableNo: "04", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 5, tableNo: "05", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 6, tableNo: "06", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 7, tableNo: "07", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 8, tableNo: "09", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 9, tableNo: "05", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
  { id: 10, tableNo: "10", status: "available", guests: 0, customerName: "", reservedGuests: 0, duration: "" },
  { id: 11, tableNo: "12", status: "reserved", guests: 0, customerName: "", reservedGuests: 4, duration: "" },
  { id: 12, tableNo: "05", status: "occupied", guests: 4, customerName: "Rajkumar", reservedGuests: 0, duration: "25 min" },
];

export const DineInPage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState(initialTableData);
  const [selectedTableForOrder, setSelectedTableForOrder] = useState(null);
  const [changingTableNo, setChangingTableNo] = useState(null);
  
  const totalTables = 10; // "Top Number of Table (10)" as per design

  const handleStartOrderSubmit = (formData) => {
    // Update the card dynamically
    setTables(prev => prev.map(t => {
      if (t.tableNo === selectedTableForOrder) {
        return {
          ...t,
          status: 'occupied',
          customerName: formData.name || t.customerName,
          guests: formData.guests || t.guests,
          duration: formData.time || t.duration
        };
      }
      return t;
    }));

    // Keep flow intact: Navigate to menu
    navigate('/dashboard/menu', { state: { tableNo: selectedTableForOrder } });
    setSelectedTableForOrder(null);
  };

  const handleChangeTableConfirm = (oldTableNo, newTableNo) => {
    setTables(prev => {
      const oldTable = prev.find(t => t.tableNo === oldTableNo);
      if (!oldTable) return prev;

      return prev.map(t => {
        if (t.tableNo === oldTableNo) {
          // Free up the old table
          return { ...t, status: 'available', customerName: '', guests: 0, reservedGuests: 0, duration: '' };
        }
        if (t.tableNo === newTableNo) {
          // Move data to new table
          return {
            ...t,
            status: oldTable.status,
            customerName: oldTable.customerName,
            guests: oldTable.guests,
            reservedGuests: oldTable.reservedGuests,
            duration: oldTable.duration
          };
        }
        return t;
      });
    });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Content container matches the exact width in Figma 947px */}
      <div className="w-[947px] mx-auto pt-[74px]">
        {changingTableNo ? (
          <ChangeTableView
            isActive={!!changingTableNo}
            onCancel={() => setChangingTableNo(null)}
            currentTableNo={changingTableNo}
            tables={tables}
            onConfirm={handleChangeTableConfirm}
          />
        ) : (
          <>
            {/* Page Title Section */}
            <h1 className="text-[18px] font-bold text-[#666687] mb-[31px]">
              Top Number of Table ({totalTables})
            </h1>

            {/* Table Grid */}
            <div className="grid grid-cols-3 gap-x-[34px] gap-y-[31px]">
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  tableNo={table.tableNo}
                  status={table.status}
                  customerName={table.customerName}
                  guests={table.guests}
                  duration={table.duration}
                  reservedGuests={table.reservedGuests}
                  onStartOrder={() => setSelectedTableForOrder(table.tableNo)}
                  onChangeTable={(tableNo) => setChangingTableNo(tableNo)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <StartOrderModal 
        isOpen={!!selectedTableForOrder} 
        onClose={() => setSelectedTableForOrder(null)} 
        tableNo={selectedTableForOrder} 
        onSubmit={handleStartOrderSubmit}
      />
    </div>
  );
};
