import { orderApi } from '../api/orderApi';

export const orderService = {
  /**
   * Maps local frontend state to the expected backend payload and submits the order.
   * @param {Object} params - The parameters for the order.
   * @param {Array} params.orderItems - The selected menu items to submit.
   * @param {string} params.orderType - 'dine_in' or 'take_away'.
   * @param {string} params.phone - Customer mobile number.
   * @param {string} params.selectedTable - Selected table name (e.g., 'T20').
   * @param {Array} params.allTables - Array of all tables to look up TableId.
   * @returns {Promise<any>}
   */
  submitOrder: async ({ orderItems, orderType, phone, selectedTable, allTables }) => {
    // Determine mapping values
    const mappedOrderType = orderType === 'dine_in' ? 'Dine In' : 'Take Away';
    const mappedOrderSource = orderType === 'dine_in' ? 'D' : 'T';

    // Lookup TableId
    let tableId = "";
    if (selectedTable && allTables && allTables.length > 0) {
      const tableObj = allTables.find(t => t.tableNo === selectedTable);
      if (tableObj) {
        tableId = String(tableObj.id);
      }
    }

    // Calculate dynamic grand total
    let grandTotal = 0;

    const mappedOrderItems = orderItems.map((item) => {
      const quantity = item.quantity || 1;
      const price = Number(item.price || 0);
      const total = quantity * price;
      grandTotal += total;

      return {
        MenuItemId: item.itemNo || item.id, // Fallback to id if itemNo missing
        MenuItemName: item.title,
        Name: item.title,
        Quantity: quantity,
        Price: price,
        Total: total.toFixed(2),
        Status: "Placed",
        Unit: item.uom || "Nos",
        OrderType: mappedOrderType,
      };
    });

    const payload = {
      OrderType: mappedOrderType,
      CustomerName: "Walk-in Customer",
      CustomerAddress: "N/A",
      CustomerMobile: phone || "",
      OrderSource: mappedOrderSource,
      TableId: tableId,
      TableName: selectedTable || "",
      Status: "Placed",
      FranchiseeId: "", // Not available in current Auth flow
      OrderItems: mappedOrderItems,
      PaymentInfo: {
        PaymentStatus: "Paid",
        PaymentModeCode: 0,
        CashAmount: 0,
        CashPaymentMode: null,
        OnlineAmount: 0,
        OnlinePaymentMode: null,
        TipAmount: 0,
        DiscountPercent: 0,
        Discount: 0,
        NetPaidAmount: 0,
        DueAmount: 0,
      },
      GrandTotal: grandTotal.toFixed(2),
    };

    const response = await orderApi.postOrder(payload);
    return response;
  },
};
