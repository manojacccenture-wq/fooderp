export const API_ENDPOINTS = {
  AUTH: {
    TOKEN: '/token',
  },
  // Future stubs for scalable architecture as requested
  MENU: {
    GET_FRANCHISEE_MENUS: '/api/Franchisee/GetFranchiseeMenus',
  },
  DINE_IN: {
    GET_CUSTOMER_ORDER_BY_TABLE_ID: '/api/DineIn/GetCustomerOrderByTableId',
  },
  TABLES: {
    GET_TABLES: '/api/Table/GetTables',
    GET_TABLES_WITH_ORDER_AMOUNT: '/api/Table/GetTablesWithOrderAmount',
    PUT_TABLE_STATUS: '/api/Table/PutTableStatus',
  },
  ORDERS: {
    POST_ORDER: '/api/Franchisee/PostOrder',
    POST_ORDER_TAKE_AWAY: '/api/Franchisee/PostOrderTakeAway',
    UPDATE_ORDER_ITEMS_WEB: '/api/Franchisee/UpdateOrderItemsWeb',
    CLOSE_ORDER: '/api/Franchisee/CloseOrder',
    PUT_ORDER_STATUS: '/api/Franchisee/PutOrderStatus',
    PUT_ORDER_PAYMENT_STATUS: '/api/Franchisee/PutOrderPaymentStatus',
    CANCEL_DINE_IN_ORDER: '/api/Franchisee/CancelDineInOrder',
    CANCEL_ORDER_ITEM: '/api/Franchisee/CancelOrderItem',
  },
  CUSTOMERS: {
    GET_CUSTOMER_NAME_LIST: '/CustomerMaster/GetCustomerNameList',
    POST_ORDERS_MODEL: '/api/Customer/PostOrdersModel',
  }
};
