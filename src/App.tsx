import { ApplicationRouter } from '@/router/applicationRouter'
import './App.css'
import 'reactflow/dist/style.css'
import { useCallback, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useToastStore, { IToast } from './store/toastStore'

function App() {
  const { setToast, toast: toastState } = useToastStore()

  const notify = useCallback(
    (toastStore: IToast | null) => {
      if (!toastStore) return

      switch (toastStore.type) {
        case 'success':
          toast.success(toastStore.title, {
            position: 'top-right',
          })
          break
        case 'error':
          toast.error(toastStore.title, {
            position: 'top-right',
          })
          break
        case 'warning':
          toast.warning(toastStore.title, {
            position: 'top-right',
          })
          break
        case 'info':
          toast.info(toastStore.title, {
            position: 'top-right',
          })
          break
        default:
          break
      }

      setToast(null)
    },
    [setToast]
  )

  useEffect(() => {
    notify(toastState)
  }, [notify, toastState])

  return (
    <div className="app">
      <ToastContainer />
      <ApplicationRouter />
    </div>
  )
}

export default App
