import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectComponent = ({ selectId, label, options }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
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
