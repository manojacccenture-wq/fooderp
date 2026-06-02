import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AvailabilityToggle } from '../../components/inventory/AvailabilityToggle/AvailabilityToggle';
import { StockDropdown } from '../../components/inventory/StockDropdown/StockDropdown';
import { updateProduct, deleteProduct } from '../../store/slices/productSlice';

export const ItemDetailsSidebar = ({ selectedItem, setSelectedItem }) => {
  const dispatch = useDispatch();
  
  // Local state for edits
  const [isAvailable, setIsAvailable] = useState(true);
  const [stock, setStock] = useState('In Stock');

  useEffect(() => {
    if (selectedItem) {
      setIsAvailable(selectedItem.isAvailable !== false);
      setStock(selectedItem.stock || 'In Stock');
    }
  }, [selectedItem]);

  const handleSave = () => {
    if (selectedItem) {
      dispatch(updateProduct({ 
        itemNo: selectedItem.itemNo, 
        isAvailable, 
        stock 
      }));
      setSelectedItem(null); // Deselect after saving
    }
  };

  const handleDelete = () => {
    if (selectedItem && window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteProduct(selectedItem.itemNo));
      setSelectedItem(null);
    }
  };

  if (!selectedItem) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white border-l border-gray-100">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8e8ea9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <h2 className="text-[20px] font-bold text-[#32324d] mb-2">Select an item</h2>
        <p className="text-[#8e8ea9] text-[15px] max-w-[250px]">Manage item availability and stock status directly from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col border-l border-gray-100 shadow-[-4px_0_15px_rgba(0,0,0,0.03)] z-20">
      <div className="flex-1 overflow-y-auto">
        {/* Header / Item Info */}
        <div className="p-6 border-b border-[#eaeaef] flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-[12px] overflow-hidden bg-[#f3f5f9] mb-4 shadow-sm">
            {selectedItem.image ? (
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <h2 className="text-[22px] font-bold text-[#32324d] leading-tight mb-1">{selectedItem.title}</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[14px] text-[#8e8ea9] font-medium bg-[#f3f5f9] px-2 py-0.5 rounded">#{selectedItem.itemNo}</span>
            {selectedItem.category && (
              <span className="text-[14px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">{selectedItem.category}</span>
            )}
          </div>
          <div className="text-[24px] font-black text-[#ff7b2c]">₹{selectedItem.price}</div>
        </div>

        {/* Management Controls */}
        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-[15px] font-bold text-[#32324d] mb-3 uppercase tracking-wider">Availability</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-[12px]">
              <span className="text-[15px] font-medium text-[#666687]">Active on Menu</span>
              <AvailabilityToggle isOn={isAvailable} onChange={setIsAvailable} />
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#32324d] mb-3 uppercase tracking-wider">Stock Status</h3>
            <StockDropdown value={stock} onChange={setStock} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#32324d] mb-3 uppercase tracking-wider">Item Details</h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-[12px]">
              <span className="text-[15px] font-medium text-[#666687]">Type</span>
              <div className={`px-3 py-1 rounded-[6px] border ${selectedItem.isVeg ? 'bg-[#b4efc6]/20 border-[#24a44b]/30 text-[#24a44b]' : 'bg-[#ffe2e5]/30 border-[#e23744]/30 text-[#e23744]'} text-[12px] font-extrabold tracking-wider`}>
                {selectedItem.isVeg ? 'VEG' : 'NON-VEG'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#eaeaef] bg-white mt-auto flex flex-col gap-3">
        <button 
          onClick={handleSave}
          className="w-full py-4 rounded-[16px] font-bold text-white bg-orange-400 hover:bg-orange-600 transition-colors shadow-sm text-[16px]"
        >
          Save Changes
        </button>
        <button 
          onClick={handleDelete}
          className="w-full py-3 rounded-[16px] font-bold text-[#e23744] hover:bg-[#ffe2e5]/50 transition-colors text-[15px]"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};
