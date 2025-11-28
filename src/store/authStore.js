import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000"; // ← Optional: Set base URL

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ========== STATE ==========
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // ========== ACTIONS ==========

      // Login
      // user can use username or email
      login: async (identifier, password) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post("/api/auth/login", {
            identifier,
            password,
          });

          const { user } = response.data;

          set({
            user,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          console.log(error);
          
          const errorMessage = error.response.data.message || "Login failed";
          console.log(errorMessage);
          
          set({
            loading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      // Register
      register: async (username, email, password) => {
        set({ loading: true, error: null });
        try {
          await axios.post("/api/auth/register", {
            email,
            username,
            password,
          });

          set({ loading: false });
          return { success: true };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Registration failed";
          set({
            loading: false,
            error: errorMessage,
          });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      checkAuth: async () => {
        const { user, isAuthenticated } = get();

        if (!user || !isAuthenticated) {
          return false;
        }

        try {
          const res = await axios.get("/api/auth/me");

          set({
            user: res.data.user,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
          });
          return false;
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post("/api/auth/logout");

          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          console.error("Logout error:", error);
          // Clear state anyway even if API fails
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
          return { success: true };
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key name
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
