import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SymptomSelector = ({ options, i, onSelect }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };


  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };  

  return (
    <div className="form-group mt-4">
      <FormControl fullWidth>
        <InputLabel id="symptom-select-label">Select a symptom {i+1} </InputLabel>
        <Select
          labelId="symptom-select-label"
          id="symptom-select"
          value={selectedOption}
          onChange={handleChange}
          label="Select a symptom "
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SymptomSelector;