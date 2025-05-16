import { create } from 'zustand'

const useLayer = create(set => ({
  isShowLayer: false,
  toggleLayer: () => set(state => ({ isShowLayer: !state.isShowLayer })),
  setLayerToFalse: () => set({ isShowLayer: false }),
  setLayerToTrue: () => set({ isShowLayer: true }),
}))

export default useLayer
