import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCard } from '../../components/cards/TableCard/TableCard';
import { StartOrderModal } from './StartOrderModal';
import { TableSelectionView } from './TableSelectionView';
import { CancelFoodView } from './CancelFoodView';
import { ReplaceFoodView } from './ReplaceFoodView';
import { CancelTableModal } from '../../components/dinein/CancelTableModal';
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
  confirmReplacement,
  cancelTable
} from '../../store/slices/tableSlice';
import { cancelOrder } from '../../store/slices/orderSlice';
import { selectActiveKots } from '../../store/slices/kotSlice';

export const DineInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const tables = useAppSelector(selectAllTables);
  const selectedTableForOrder = useAppSelector(selectSelectedTableForOrder);
  const actionTarget = useAppSelector(selectActionTarget);
  const activeKots = useAppSelector(selectActiveKots);
  
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
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <style>
        {`
          .dinein-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .dinein-scrollbar::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 4px;
          }
          .dinein-scrollbar:hover::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .dinein-scrollbar::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px;
          }
          .dinein-scrollbar:hover::-webkit-scrollbar-thumb {
            background: #FBBF24;
          }
          .dinein-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #F59E0B !important;
          }
        `}
      </style>
      {/* Main Content container matches the exact width in Figma 947px */}
      <div className="p-11 mx-auto pt-[74px] flex flex-col h-full w-full">
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
          <div className="flex flex-col flex-1 min-h-0">
            {/* Page Title Section */}
            <h1 className="text-[18px] font-bold text-[#666687] mb-[31px] shrink-0">
              Top Number of Table ({totalTables})
            </h1>

            {/* Scrollable Table Container */}
            <div className="flex-1 overflow-y-auto scroll-smooth pr-4 pb-8 dinein-scrollbar">
              {/* Table Grid */}
              <div className="grid grid-cols-3 gap-x-[34px] gap-y-[31px]">
                {tables.map((table) => {
                  let workflowStatus = null;
                  if (table.status === 'occupied') {
                    const data = table.orderData;
                    if (!data) {
                      workflowStatus = 'DRAFT';
                    } else if (data.rightView === 'checkout') {
                      workflowStatus = 'BILLING';
                    } else {
                      const tableKots = activeKots.filter(k => String(k.tableReference) === String(table.tableNo));
                      if (tableKots.length > 0) {
                        if (tableKots.some(k => k.status === 'ready')) {
                          workflowStatus = 'READY';
                        } else if (tableKots.some(k => k.status === 'preparing')) {
                          workflowStatus = 'PREPARING';
                        } else {
                          workflowStatus = 'KOT SENT';
                        }
                      } else {
                        if (data.kotStatus === 'ready') workflowStatus = 'READY';
                        else if (data.kotStatus === 'preparing') workflowStatus = 'PREPARING';
                        else if (data.kotStatus === 'sent' || (data.sentKotItems && data.sentKotItems.length > 0)) workflowStatus = 'KOT SENT';
                        else workflowStatus = 'DRAFT';
                      }
                    }
                  }

                  return (
                    <TableCard
                      key={table.id}
                      tableNo={table.tableNo}
                      status={table.status}
                      customerName={table.customerName}
                      guests={table.guests}
                      duration={table.duration}
                      reservedGuests={table.reservedGuests}
                      workflowStatus={workflowStatus}
                      onStartOrder={() => dispatch(setSelectedTableForOrder(table.tableNo))}
                      onResumeOrder={() => navigate('/dashboard/menu', { state: { tableNo: table.tableNo, existingSession: true } })}
                      onChangeTable={(tableNo) => dispatch(setActionTarget({ type: 'change', tableNo }))}
                      onMergeTable={(tableNo) => dispatch(setActionTarget({ type: 'merge', tableNo }))}
                      onCancelFood={(tableNo) => dispatch(setActionTarget({ type: 'cancel-food', tableNo }))}
                      onReplaceFood={(tableNo) => dispatch(setActionTarget({ type: 'replace-food', tableNo }))}
                      onCancelTable={(tableNo) => dispatch(setActionTarget({ type: 'cancel-table', tableNo }))}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <StartOrderModal 
        isOpen={!!selectedTableForOrder} 
        onClose={() => dispatch(setSelectedTableForOrder(null))} 
        tableNo={selectedTableForOrder} 
        onSubmit={handleStartOrderSubmit}
      />

      <CancelTableModal
        isOpen={actionTarget?.type === 'cancel-table'}
        onClose={() => dispatch(setActionTarget(null))}
        onConfirm={(reason, remarks) => {
          dispatch(cancelTable({ tableNo: actionTarget.tableNo, reason, remarks }));
          dispatch(cancelOrder());
          dispatch(setActionTarget(null));
        }}
      />
    </div>
  );
};
