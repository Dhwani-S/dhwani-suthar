"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

/**
 * SQLInjectionToast - Playful toast for SQL injection attempts
 */

interface SQLInjectionToastProps {
  show: boolean;
  message: string;
  onDismiss: () => void;
}

export function SQLInjectionToast({ show, message, onDismiss }: SQLInjectionToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000]"
        >
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl shadow-red-500/30 border border-red-400/30">
            <Shield className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium text-sm">{message}</p>
            <button
              onClick={onDismiss}
              className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SQLInjectionToast;
