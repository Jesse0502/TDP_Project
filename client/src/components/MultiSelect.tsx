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
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleToggle(option.value)}
          className={`px-4 py-2 rounded ${
            selected.includes(option.value)
              ? 'bg-blue-500 text-white'
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
