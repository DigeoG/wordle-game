import React from 'react';

export type Status = 'correct' | 'present' | 'absent';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '?', 'BACKSPACE'],
];

const Keyboard: React.FC<{
  onKey: (key: string) => void;
  statuses: Record<string, Status>;
}> = ({ onKey, statuses }) => (
  <div className="keyboard">
    {rows.map((row, i) => (
      <div key={i} className="kb-row">
        {row.map(key => (
          <button
            key={key}
            className={`key ${statuses[key] ?? ''} ${key.length > 1 ? 'wide' : ''}`}
            onClick={() => onKey(key)}
          >
            {key === 'BACKSPACE' ? '⌫' : key}
          </button>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;