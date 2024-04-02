export const trimAndValidate = (set, value, errorSetter, errorMessage) => {
  const trimValue = value.trim();
  if (!trimValue) {
    set({ isLoading: false, [errorSetter]: errorMessage });
  }
  return trimValue;
};
