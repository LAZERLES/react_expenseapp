import { create } from "zustand";
import api from "../tools/axiosTools";

const useCategoryStore = create((set) => ({
    categories: [],
    error: null,

    getCategories: async () => {
        try {
            const res = await api.get('/categories/');
    
            set({ categories: res.data.categories });

            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message });
            return { success: false, error: error.response?.data?.message };
        }
    }
}))

export default useCategoryStore