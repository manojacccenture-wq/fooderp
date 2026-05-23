/**
 * Flattens the specialInstructions object into a simple array of selected values.
 * Ignores empty arrays, nulls, and removes the keys (groups).
 * 
 * @param {Object} specialInstructions - The special instructions object from the order item.
 * @returns {string[]} An array of selected instruction strings.
 */
export const getSelectedSpecialInstructions = (specialInstructions) => {
  if (!specialInstructions) return [];

  const { additionalNote, ...dynamicSelections } = specialInstructions;
  const tags = [];

  Object.values(dynamicSelections).forEach(selection => {
    if (Array.isArray(selection)) {
      tags.push(...selection.filter(Boolean));
    } else if (selection) {
      tags.push(selection);
    }
  });

  return tags;
};
