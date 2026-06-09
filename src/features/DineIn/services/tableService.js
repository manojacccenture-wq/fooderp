import { tableApi } from '../api/tableApi';

export const tableService = {
  /**
   * Fetches tables and maps them to the expected frontend format.
   * @returns {Promise<any[]>}
   */
  fetchAndMapTables: async () => {
    const response = await tableApi.getTables();

    if (!response || !response.IsSuccessful || !response.Data) {
      throw new Error(response?.Message || 'Failed to fetch tables from API');
    }

    return response.Data.map(item => ({
      // Mappings exactly as requested
      tableId: item.Id,
      tableName: item.Name,
      chairCount: item.Chairs,
      status: item.Status?.toLowerCase() || 'available', // Safely map status

      // Mappings to preserve existing UI TableCard and DineIn component expectations
      id: item.Id,
      tableNo: item.Name,
      guests: item.Chairs,
      customerName: "",
      reservedGuests: 0,
      duration: ""
    }));
  },
};
