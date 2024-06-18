import React from 'react';

const SymptomSelector = ({ options }) => {
  return (
    <select className="form-control mt-4">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SymptomSelector;