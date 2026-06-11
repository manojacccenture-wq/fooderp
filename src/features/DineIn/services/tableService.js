import { tableApi } from '../api/tableApi';

export const tableService = {
  /**
   * Fetches tables and maps them to the expected frontend format.
   * @returns {Promise<any[]>}
   */
  fetchAndMapTables: async () => {
    const response = await tableApi.getTables();
    

    let tablesData = [];

    // Check for both PascalCase and camelCase keys
    const isSuccessful = response?.IsSuccessful ?? response?.isSuccessful;
    const data = response?.Data ?? response?.data;
    const message = response?.Message ?? response?.message;

    if (Array.isArray(response)) {
      tablesData = response;
    } else if (response && isSuccessful && data) {
      tablesData = data;
    } else {
      throw new Error(message || 'Failed to fetch tables from API');
    }

    const mappedTables = tablesData.map(item => {
      // Extract properties safely supporting both PascalCase and camelCase
      const itemId = item.Id ?? item.id;
      const itemName = item.Name ?? item.name;
      const itemChairs = item.Chairs ?? item.chairs;
      const itemStatus = item.Status ?? item.status;

      return {
        // Mappings exactly as requested
        tableId: itemId,
        tableName: itemName,
        chairCount: itemChairs,
        status: itemStatus || 'Empty', // Safely map status

        // Mappings to preserve existing UI TableCard and DineIn component expectations
        id: itemId,
        tableNo: itemName,
        guests: itemChairs,
        customerName: "",
        reservedGuests: 0,
        duration: ""
      };
    });

    return mappedTables;
  },
};
