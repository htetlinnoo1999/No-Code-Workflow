import { create } from 'zustand'

export interface IToastState {
  toast: IToast | null
  setToast: (message: IToast | null) => void
}

export interface IToast {
  title: string
  type: 'success' | 'error' | 'warning' | 'info'
}

const useToastStore = create<IToastState>()((set) => ({
  toast: null,
  setToast: (toast: IToast | null) => {
    if (!toast) {
      return set(() => ({ toast: null }))
    } else {
      const { title, type } = toast
      set(() => ({
        toast: {
          title,
          type,
        },
      }))
    }
  },
}))
export default useToastStore
