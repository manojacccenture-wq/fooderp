import { menuApi } from '../api/menuApi';

export const menuService = {
  /**
   * Fetches menus and maps them to the existing ProductCard format.
   * @returns {Promise<{ categories: string[], items: any[] }>}
   */
  fetchAndMapMenus: async () => {
    const response = await menuApi.getFranchiseeMenus();

    if (!response || !response.IsSuccessful || !response.Data) {
      throw new Error('Failed to fetch menus from API');
    }

    const categories = ['All Dishes'];
    const items = [];

    response.Data.forEach((category) => {
      // Add category name to the dynamic categories list if not already present
      if (category.NAME && !categories.includes(category.NAME)) {
        categories.push(category.NAME);
      }

      if (category.MenuItems && Array.isArray(category.MenuItems)) {
        category.MenuItems.forEach((menuItem) => {
          // Extract price, quantity, uom from the first option if available
          let price = 0;
          let quantity = 1;
          let uom = '';
          let optionId = null;

          if (menuItem.MenuItemOptions && menuItem.MenuItemOptions.length > 0) {
            const firstOption = menuItem.MenuItemOptions[0];
            price = firstOption.Price || 0;
            quantity = firstOption.Quantity || 1;
            uom = firstOption.UOM || '';
            optionId = firstOption.FMIO_ID || null;
          }

          items.push({
            itemNo: String(menuItem.MI_ID || menuItem.FMI_ID), // Existing UI uses string
            title: menuItem.ITEM_NAME,
            description: menuItem.ITEM_DESC || '',
            price: String(price), // Existing UI uses string prices sometimes, but numbers are fine too
            isVeg: true, // Placeholder/Fallback as API schema didn't explicitly specify Veg/NonVeg
            image: menuItem.ITEM_IMG_URL || '',
            category: category.NAME,
            specialInstructionGroups: [],
            isAvailable: true,
            stock: 'In Stock',
            
            // Additional API fields mapped
            quantity,
            uom,
            optionId,
            categoryId: category.MC_ID
          });
        });
      }
    });

    return { categories, items };
  },
};
