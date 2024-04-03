export const trimAndValidate = (value, errorMessage) => {
  const trimValue = value.trim();
  if (!trimValue) {
    return { value: trimValue, error: errorMessage };
  }
  return { value: trimValue, error: null };
};
