export const ORDER_STATUS_COLORS = {
  available: {
    bg: "#ffffff",
    border: "#bbf7d0", // Light green border
    text: "#16a34a",   // Dark green text
    label: "AVAILABLE"
  },
  draft: {
    bg: "#ffffff",
    border: "#f59e0b",
    text: "#f59e0b",
    label: "DRAFT"
  },
  kot_sent: {
    bg: "#ffffff",
    border: "#ef4444", // Red border
    text: "#ef4444",   // Red text
    label: "KOT SENT"
  },
  preparing: {
    bg: "#F3E8FF",
    border: "#A855F7",
    text: "#7E22CE",
    label: "PREPARING"
  },
  ready: {
    bg: "#ECFDF5",
    border: "#10B981",
    text: "#047857",
    label: "READY"
  },
  billing: {
    bg: "#FEF3C7",
    border: "#F59E0B",
    text: "#92400E",
    label: "BILLING"
  },
  payment_pending: {
    bg: "#FFF1F2",
    border: "#F43F5E",
    text: "#BE123C",
    label: "PAYMENT PENDING"
  },
  paid: {
    bg: "#F0FDF4",
    border: "#22C55E",
    text: "#15803D",
    label: "PAID"
  }
};

export const getOrderStatusStyles = (status) => {
  return ORDER_STATUS_COLORS[status] || ORDER_STATUS_COLORS.available;
};

// Determines the global status of the currently active table based on its order items and view states.
export const getCurrentOrderStatus = ({
  paymentStatus,
  isUpiModalOpen,
  rightView,
  paymentMode,
  kotStatus,
  draftOrderItemsCount,
  sentKotItemsCount,
  hasSelectedTable
}) => {
  if (paymentStatus === 'success') return 'paid';
  if (isUpiModalOpen || (rightView === 'checkout' && paymentMode === 'Upi' && paymentStatus === 'pending')) return 'payment_pending';
  if (rightView === 'checkout') return 'billing';
  
  if (kotStatus === 'ready') return 'ready';
  if (kotStatus === 'preparing') return 'preparing';
  if (kotStatus === 'kot_sent' || kotStatus === 'success_anim' || kotStatus === 'sent') return 'kot_sent';
  
  if (draftOrderItemsCount > 0) return 'draft';
  if (sentKotItemsCount > 0) return 'kot_sent';

  return hasSelectedTable ? 'draft' : 'Empty';
};

// Determines the status for inactive tables based strictly on Redux order data
export const determineTableStatus = (table) => {
  if (table.status === 'Empty') return 'Empty';
  
  const { orderData } = table;
  if (!orderData) return 'draft'; // Occuiped but no orderData means draft
  
  // Since we only mock Preparing/Ready in the active view, for inactive tables we fallback to kot_sent or draft
  if (orderData.sentKotItems?.length > 0) return 'kot_sent';
  if (orderData.draftOrderItems?.length > 0) return 'draft';
  
  return 'draft';
};
