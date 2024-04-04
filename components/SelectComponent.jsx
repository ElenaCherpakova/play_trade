import { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectComponent = ({ selectId, label, options, onSelectionChange, selectedValue }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(selectedValue || "");
  }, [options, selectedValue]);

  const handleSelectChange = event => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onSelectionChange(selectId, newValue);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
        <Select labelId={`${selectId}-label`} id={selectId} value={selectedOption} onChange={handleSelectChange}>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;
