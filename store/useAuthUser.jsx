import { create } from "zustand";
import { signOut, signIn } from "next-auth/react";
import { emailRegexValidate, trimAndValidate } from "@/utils/helpers";

const useAuthUser = create(set => ({
  email: "",
  verifyError: "",
  isLoading: false,
  error: null,
  passwordResetSuccess: false,
  emailError: null,
  nameError: null,

  login: async userData => {
    const { email, password } = userData;
    set({ isLoading: true, error: null });
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: `${window.location.origin}/market`
      });
      if (response?.error) {
        let errorMessage = "";
        if (response.error === "CredentialsSignin") {
          errorMessage = "please check your login details and try again.";
        }
        set({ error: errorMessage, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await signOut({
        callbackUrl: `${window.location.origin}/signin`
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  register: async newUserData => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
      });
      const data = await response.json();
      if (response.ok) {
        set({ isLoading: false, error: null });
        window.location.href = "/signin";
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  googleLogin: async () => {
    try {
      await signIn("google", {
        callbackUrl: `${window.location.origin}/market`
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  forgetPassword: async userData => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        set({ isLoading: false, error: null });
        window.location.href = "/signin";
      } else {
        throw new Error(data.error || "Resetting the password failed");
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  resetPassword: async (password, email) => {
    set({ isLoading: true, error: null, passwordResetSuccess: false });
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email })
      });

      if (response.ok) {
        set({ isLoading: false, passwordResetSuccess: true });
      } else {
        const errorData = await response.json();
        console.log(errorData);
        set({ isLoading: false, error: errorData.error || "Resetting the password failed" });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message, passwordResetSuccess: false });
    }
  },
  verifyToken: async token => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        const { email } = await response.json();
        set({ isLoading: false, email, verifyError: "" });
      } else {
        const errorData = await response.json();
        set({ isLoading: false, verifyError: errorData.error || "Token verification failed" });
      }
    } catch (error) {
      set({ isLoading: false, verifyError: error.message });
    }
  },
  updateProfile: async userData => {
    set({ isLoading: true, error: null, emailError: null, nameError: null });
    
    const email = trimAndValidate(set, userData.email, "emailError", "Email is required");
    const name = trimAndValidate(set, userData.name, "nameError", "Name is required");

    if (!name || !email) return;

    if (!emailRegexValidate(email)) {
      set({ isLoading: false, emailError: "Invalid email address" });
      return;
    }

    try {
      const response = await fetch("/api/auth/profile/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data", data)
        set({ isLoading: false, data, error: null });
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "Failed to update profile";
        console.log(errorMsg);
        set({ isLoading: false, error: errorMsg });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  }
}));
export default useAuthUser;
