import { useEffect } from "react";
import useSelectStore from "../store/useSelectStore";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectComponent = ({ selectId, label, options }) => {
  const selectState = useSelectStore(state => state.selectStates[selectId]) || {
    selectedOption: " ",
    setSelectedOption: () => {}
  };

  const { selectedOption, setSelectedOption } = selectState;

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  //   useEffect(() => {
  //     useSelectStore.setState(state => ({
  //       ...state,
  //       setSelectState: { ...state.setSelectState, [selectId]: selectState }
  //     }));
  //   }, [selectId, selectState]);

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
        <Select labelId={`${selectId}-label`} id={selectId} value={selectedOption} onChange={handleSelectChange}>
          {options.map(option => (
            <MenuItem key={option} value={selectedOption}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectComponent;
