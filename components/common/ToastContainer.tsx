'use client';

import { useNotificationStore } from '@/lib/store/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Heart, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-neutral-900/95 text-white shadow-2xl backdrop-blur-md border border-amber-500/20"
          >
            {toast.type === 'favorite' ? (
              <div className="p-1 rounded-full bg-rose-500/20 text-rose-400">
                <Heart size={18} fill="currentColor" />
              </div>
            ) : toast.type === 'info' ? (
              <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                <Info size={18} />
              </div>
            ) : (
              <div className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                <CheckCircle size={18} />
              </div>
            )}

            <div className="flex-1">
              <h4 className="font-semibold text-sm text-amber-100">{toast.title}</h4>
              {toast.message && <p className="text-xs text-neutral-300 mt-0.5">{toast.message}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white p-1 transition-colors"
              aria-label="Fermer la notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
}
