"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/xykdzrlz", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email || "No email provided",
          message: formData.message,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      
      setIsSuccess(true);
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ email: "", message: "" });
        }, 300);
      }, 1500);
      
    } catch (error) {
      // Fallback to mailto
      const mailtoLink = `mailto:dhwani.suthar02@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(formData.message)}${formData.email ? `%0A%0AFrom: ${formData.email}` : ""}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className={cn(
            "fixed inset-0 z-50",
            "flex items-start sm:items-center justify-center",
            "p-2 sm:p-4 pt-4 sm:pt-4",
            "bg-black/50 backdrop-blur-sm",
            "overflow-y-auto"
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={cn(
              "relative",
              // Width: 95% on mobile, max-w-lg on larger screens
              "w-[95%] max-w-lg",
              // Height: Scrollable if content exceeds viewport
              "max-h-[90vh] overflow-y-auto",
              // Vertical margins for keyboard awareness
              "my-2 sm:my-8",
              // Styling
              "bg-white/95 dark:bg-zinc-900/95",
              "backdrop-blur-xl",
              "rounded-2xl",
              "border border-zinc-200 dark:border-white/10",
              "shadow-2xl shadow-black/10 dark:shadow-black/30"
            )}
          >
            {/* Close Button - 44x44px touch target */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-3 right-3 sm:top-4 sm:right-4",
                "min-w-[44px] min-h-[44px] w-11 h-11",
                "flex items-center justify-center",
                "rounded-full",
                "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-white/10",
                "transition-colors",
                "active:scale-95"
              )}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content - Responsive padding */}
            <div className="p-5 sm:p-6">
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="mb-5 sm:mb-6 pr-8">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-1">
                      Start a Conversation
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Response time: &lt; 24 hours</span>
                    </div>
                  </div>

                  {/* Email Display */}
                  <div className={cn(
                    "flex items-center gap-3 p-3 mb-5 sm:mb-6 rounded-xl",
                    "bg-blue-50 dark:bg-blue-500/10",
                    "border border-blue-100 dark:border-blue-500/20"
                  )}>
                    <div className={cn(
                      "w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center",
                      "bg-blue-100 dark:bg-blue-500/20"
                    )}>
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">
                        Direct Email
                      </p>
                      <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">
                        dhwani.suthar02@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input - 16px font to prevent iOS zoom */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com (optional)"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl",
                          "bg-zinc-50 dark:bg-white/5",
                          "border border-zinc-200 dark:border-white/10",
                          // text-base (16px) prevents iOS auto-zoom
                          "text-base text-zinc-900 dark:text-white",
                          "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500",
                          "transition-all"
                        )}
                      />
                    </div>

                    {/* Message Textarea - 16px font to prevent iOS zoom */}
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can I help you optimize your data pipelines?"
                        required
                        rows={3}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl resize-none",
                          "bg-zinc-50 dark:bg-white/5",
                          "border border-zinc-200 dark:border-white/10",
                          // text-base (16px) prevents iOS auto-zoom
                          "text-base text-zinc-900 dark:text-white",
                          "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500",
                          "transition-all"
                        )}
                      />
                    </div>

                    {/* Submit Button - Large touch target */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.message.trim()}
                      className={cn(
                        "w-full flex items-center justify-center gap-2",
                        // Min height for touch target
                        "min-h-[48px] px-6 py-3 rounded-xl",
                        "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
                        "text-white font-medium text-base",
                        "transition-all duration-200",
                        "shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600",
                        "active:scale-[0.98]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy Note */}
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-4">
                    Your message will be sent directly to my inbox. No spam, ever.
                  </p>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 sm:py-8 text-center"
                >
                  <div className={cn(
                    "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                    "bg-emerald-100 dark:bg-emerald-500/20"
                  )}>
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    Message Sent! 🚀
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;
