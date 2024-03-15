import  { create } from 'zustand';
import { signOut, signIn } from "next-auth/react"

const useAuthUser = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (userData) => {
    const { email, password } = userData
    set({ isLoading: true, error: null });
    try {
      await signIn('credentials', { 
        email, 
        password,
        redirect: false,
        callbackUrl: `${window.location.origin}/market`
      });
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

  register: async (newUserData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });

      const data = await response.json();

      if (response.ok) {
        set({ user: data.user, token: data.token, isLoading: false });
        window.location.href = '/signin';
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  googleLogin: async () => {
    try {
      await signIn("google");
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
export default useAuthUser;