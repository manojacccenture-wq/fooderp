import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCard } from '../../components/cards/TableCard/TableCard';
import { StartOrderModal } from './StartOrderModal';
import { TableSelectionView } from './TableSelectionView';
import { CancelFoodView } from './CancelFoodView';
import { ReplaceFoodView } from './ReplaceFoodView';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  selectAllTables, 
  selectSelectedTableForOrder, 
  selectActionTarget, 
  setSelectedTableForOrder,
  setActionTarget,
  startOrderForTable,
  confirmSelection,
  confirmCancellation,
  confirmReplacement
} from '../../store/slices/tableSlice';
import { cancelOrder } from '../../store/slices/orderSlice';

export const DineInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const tables = useAppSelector(selectAllTables);
  const selectedTableForOrder = useAppSelector(selectSelectedTableForOrder);
  const actionTarget = useAppSelector(selectActionTarget);
  
  const totalTables = 10; // "Top Number of Table (10)" as per design

  const handleStartOrderSubmit = (formData) => {
    dispatch(startOrderForTable({ tableNo: selectedTableForOrder, formData }));
    // Keep flow intact: Navigate to menu
    navigate('/dashboard/menu', { state: { tableNo: selectedTableForOrder } });
    dispatch(setSelectedTableForOrder(null));
  };

  const handleSelectionConfirm = (oldTableNo, selectedTables) => {
    dispatch(confirmSelection({ actionType: actionTarget?.type, oldTableNo, selectedTables }));
  };

  const handleConfirmCancellation = (tableNo, data) => {
    console.log('Cancellation confirmed for table:', tableNo, data);
    dispatch(confirmCancellation({ tableNo, data }));
    dispatch(cancelOrder());
    dispatch(setActionTarget(null));
  };

  const handleConfirmReplacement = (tableNo, data) => {
    console.log('Replacement confirmed for table:', tableNo, data);
    dispatch(confirmReplacement({ tableNo, data }));
    dispatch(setActionTarget(null));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Content container matches the exact width in Figma 947px */}
      <div className="p-11 mx-auto pt-[74px]">
        {actionTarget?.type === 'cancel-food' ? (
          <CancelFoodView
            tableNo={actionTarget.tableNo}
            onClose={() => dispatch(setActionTarget(null))}
            onConfirmCancellation={handleConfirmCancellation}
          />
        ) : actionTarget?.type === 'replace-food' ? (
          <ReplaceFoodView
            tableNo={actionTarget.tableNo}
            onClose={() => dispatch(setActionTarget(null))}
            onConfirmReplacement={handleConfirmReplacement}
          />
        ) : actionTarget ? (
          <TableSelectionView
            isActive={!!actionTarget}
            onCancel={() => dispatch(setActionTarget(null))}
            currentTableNo={actionTarget.tableNo}
            tables={tables}
            onConfirm={handleSelectionConfirm}
            selectionMode={actionTarget.type === 'change' ? 'single' : 'multiple'}
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
                  onStartOrder={() => dispatch(setSelectedTableForOrder(table.tableNo))}
                  onChangeTable={(tableNo) => dispatch(setActionTarget({ type: 'change', tableNo }))}
                  onMergeTable={(tableNo) => dispatch(setActionTarget({ type: 'merge', tableNo }))}
                  onCancelFood={(tableNo) => dispatch(setActionTarget({ type: 'cancel-food', tableNo }))}
                  onReplaceFood={(tableNo) => dispatch(setActionTarget({ type: 'replace-food', tableNo }))}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <StartOrderModal 
        isOpen={!!selectedTableForOrder} 
        onClose={() => dispatch(setSelectedTableForOrder(null))} 
        tableNo={selectedTableForOrder} 
        onSubmit={handleStartOrderSubmit}
      />
    </div>
  );
};
