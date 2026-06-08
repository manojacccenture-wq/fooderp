import React from 'react';
import { getSelectedSpecialInstructions } from '../../shared/utils/getSelectedSpecialInstructions';

export const SpecialInstructionTags = ({ instructions }) => {
  if (!instructions) return null;

  const tags = getSelectedSpecialInstructions(instructions);
  const additionalNote = instructions.additionalNote;

  if (tags.length === 0 && !additionalNote) return null;

  return (
    <div className="mt-2 flex flex-col gap-1 w-full">
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

