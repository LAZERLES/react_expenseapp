import axios from "axios";
import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories: [],
    error: null,

    getCategories: async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categories/');
    
            set({ categories: res.data.categories });

            return { success: true };
        } catch (error) {
            set({ error: error.response?.data?.message });
            return { success: false, error: error.response?.data?.message };
        }
    }
}))

export default useCategoryStore