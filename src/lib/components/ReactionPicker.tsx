import React from 'react';
import { Reaction } from '../../types';

interface ReactionPickerProps {
  onSelect: (type: Reaction['type']) => void;
  reactions: Reaction[];
}

const AVAILABLE_REACTIONS: Reaction['type'][] = ['❤️', '👍', '🔥', '😍', '🎨'];

export default function ReactionPicker({ onSelect, reactions }: ReactionPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 z-10">
      <div className="flex space-x-2">
        {AVAILABLE_REACTIONS.map((type) => {
          const reaction = reactions.find(r => r.type === type);
          return (
            <button
              key={type}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(type);
              }}
              className="group relative hover:scale-125 transition-transform"
            >
              <span className="text-xl">{type}</span>
              {reaction && (
                <span className="absolute -top-2 -right-2 bg-gray-100 rounded-full text-xs px-1 scale-0 group-hover:scale-100 transition-transform">
                  {reaction.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}