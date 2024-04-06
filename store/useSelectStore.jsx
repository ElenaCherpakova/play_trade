import { create } from "zustand";

const useSelectStore = create(set => ({
  selectStates: {},
  setSelectState: (selectId, state) =>
    set(prevState => ({
      selectStates: {
        ...prevState.selectStates,
        [selectId]: state
      }
    }))
}));

export default useSelectStore;
