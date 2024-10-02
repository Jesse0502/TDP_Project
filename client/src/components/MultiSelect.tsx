import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const handleToggle = (value: string) => {
    let updatedSelected: string[];
    if (selected.includes(value)) {
      updatedSelected = selected.filter((v) => v !== value);
    } else {
      updatedSelected = [...selected, value];
    }
    setSelected(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <div className="grid grid-cols-12 gap-2 max-h-60 overflow-y-auto custom-scroll px-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleToggle(option.value)}
          className={`p-4 rounded-lg col-span-4 ${
            selected.includes(option.value)
              ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MultiSelect;
