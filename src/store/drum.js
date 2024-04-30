import { create } from 'zustand'
import description from '../pages/drum/data/description'

const useDrumInfo = create((set) => ({
  description,
  setDrumInfo: (infoObj) => set((state) => ({ ...state, ...infoObj })),
  removeDrumInfo: () => set(() => {}),
  resetDrumInfo: () => set(() => ({ ...description })),
}))

export default useDrumInfo
