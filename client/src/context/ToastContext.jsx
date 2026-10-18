import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";

const ToastContext = createContext(null);
const toastIcons = {
  success: FiCheckCircle,
  error: FiXCircle,
  info: FiInfo,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((message, type = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [...current.slice(-3), { id, message, type }]);
    timers.current.set(id, setTimeout(() => dismissToast(id), 4500));
  }, [dismissToast]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-relevant="additions">
        {toasts.map(({ id, message, type }) => {
          const Icon = toastIcons[type] || toastIcons.info;
          return (
            <div className={`toast-message toast-message-${type}`} key={id} role={type === "error" ? "alert" : "status"}>
              <Icon className="toast-message-icon" aria-hidden="true" />
              <p>{message}</p>
              <button type="button" aria-label="Dismiss notification" onClick={() => dismissToast(id)}>
                <FiX aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
