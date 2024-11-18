import { create } from "zustand";

const info = {
  projectName: "",
  date: "",
  number: 0,
  description: "",
  url: "",
};

const usePageInfo = create((set) => ({
  info: info,
  setInfo: (payload) => set({ info: payload }),
}));

export default usePageInfo;
