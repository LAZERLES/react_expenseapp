import axios from "axios";
import { create } from "zustand";
import api from "../tools/axiosTools";

const useTransactionStore = create((set, get) => ({
  // State
  transactions: [],
  balance: 0,
  summary: [],
  loading: false,
  error: null,

  // Action
  getTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/transactions");

      set({
        transactions: res.data.transactions,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message,
      });
    }
  },

  getBalance: async () => {
    try {
      const res = await api.get(
        "/transactions/balance"
      );

      set({ balance: res.data.balance });
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  },

  createTransaction: async (transactionData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(
        "/transactions",
        transactionData
      );

      set((state) => ({
        transactions: [res.data.transaction, ...state.transactions],
        loading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message,
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  updateTransaction: async (id, transactionData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(
        `/transactions/${id}`,
        transactionData
      );

      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id ? res.data.transaction : transaction
        ),
        loading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message,
      });
      return { success: false, error: error.response?.data?.message };
    }
  },

  deleteTransaction: async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id
        ),
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  getSummary: async () => {
    try {
      const res = await api.get("/transactions/summary");

      set({ summary: res.data });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  }
}));

export default useTransactionStore;
