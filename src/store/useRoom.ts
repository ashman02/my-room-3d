import { create } from "zustand"


interface RoomState {
    isLightOn : boolean
    switchLight : () => void
}

const useRoom = create<RoomState>()((set) => ({
    isLightOn : false,
    switchLight : () => set((state) => ({isLightOn : !state.isLightOn}))
}))

export default useRoom