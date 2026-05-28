export const KEYBOARD_ACTIONS = {
  SEARCH: {
    id: 'search',
    description: 'Search menu items',
    displayKeys: ['Ctrl', 'S'],
    match: (e) => e.ctrlKey && e.key.toLowerCase() === 's'
  },
  NAVIGATE_MENU: {
    id: 'navigate_menu',
    description: 'Navigate menu grid',
    displayKeys: ['←', '→'],
    matchRight: (e) => e.key === 'ArrowRight',
    matchLeft: (e) => e.key === 'ArrowLeft',
    matchUp: (e) => e.key === 'ArrowUp',
    matchDown: (e) => e.key === 'ArrowDown',
  },
  NAVIGATE_ORDER: {
    id: 'navigate_order',
    description: 'Navigate current order',
    displayKeys: ['↑', '↓'],
    matchUp: (e) => e.key === 'ArrowUp',
    matchDown: (e) => e.key === 'ArrowDown',
  },
  MODIFY_QUANTITY: {
    id: 'modify_qty',
    description: 'Increase / Decrease quantity',
    displayKeys: ['+', '-'],
    matchIncrease: (e) => e.key === '+' || e.key === '=',
    matchDecrease: (e) => e.key === '-' || e.key === '_'
  },
  ADD_ITEM: {
    id: 'add_item',
    description: 'Add product from menu',
    displayKeys: ['Enter'],
    match: (e) => e.key === 'Enter' || e.key === 'ArrowUp' // existing grid behavior uses ArrowUp/Enter
  },
  EXIT_SEARCH: {
    id: 'exit_search',
    description: 'Exit active search',
    displayKeys: ['Esc'],
    match: (e) => e.key === 'Escape'
  },
  SWITCH_SECTION: {
    id: 'switch_section',
    description: 'Switch between Menu / Order',
    displayKeys: ['Tab'],
    match: (e) => e.key === 'Tab'
  }
};

export const SHORTCUTS_LIST = Object.values(KEYBOARD_ACTIONS);
