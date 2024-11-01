import { toast } from "react-toastify";

export const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
    closeButton: false,
    className:
      'px-5 py-2.5 bg-slate-500/20 rounded-xl text-white backdrop-blur w-11/12 mx-auto',
  }