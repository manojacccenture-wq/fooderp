import React from 'react';

export const SpecialInstructionTags = ({ instructions }) => {
  if (!instructions) return null;

  const { additionalNote, ...dynamicSelections } = instructions;
  
  // Collect all active instructions into a single array for rendering
  const tags = [];
  Object.values(dynamicSelections).forEach(selection => {
    if (Array.isArray(selection)) {
      tags.push(...selection);
    } else if (selection) {
      // Fallback just in case it's a string somehow
      tags.push(selection);
    }
  });

  if (tags.length === 0 && !additionalNote) return null;

  return (
    <div className="mt-2 flex flex-col gap-1 w-full">
      <span className="text-[12px] font-semibold text-[#8e8ea9]">Special Instructions</span>
      <div className="flex flex-wrap gap-[6px]">
        {tags.map((tag, idx) => (
          <div key={idx} className="bg-[#f0edff] text-[#6b4eff] px-2 py-1 rounded-[8px] text-[10px] font-bold">
            {tag}
          </div>
        ))}
      </div>
      {additionalNote && (
        <span className="text-[11px] font-medium text-[#666687] mt-1 italic break-words">
          "{additionalNote}"
        </span>
      )}
    </div>
  );
};
