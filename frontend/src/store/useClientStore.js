import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useClientStore = create((set) => ({
  clients: [],
  loading: false,

  fetchClients: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/clients");
      set({ clients: res.data });
    } catch (error) {
      console.error("Fetch error", error);
      toast.error("Could not load clients");
    } finally {
      set({ loading: false });
    }
  },

  createClient: async (clientData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/clients", clientData);
      set((state) => ({ clients: [...state.clients, res.data] }));
      toast.success("Client added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Client creation failed");
    } finally {
      set({ loading: false });
    }
  },
}));
