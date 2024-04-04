import { emailRegexValidate } from "./regex";

export const trimAndValidate = (name, value) => {
  let newError = "";
  let trimmedValue = value.trim();
  if (name === "email") {
    if (!trimmedValue) {
      newError = "Email is required";
    } else if (!emailRegexValidate(trimmedValue)) {
      newError = "Please enter a valid email address";
    }
  } else if (name === "name" && !trimmedValue) {
    newError = "Name is required";
  }
  return { value: trimmedValue, error: newError };
};
