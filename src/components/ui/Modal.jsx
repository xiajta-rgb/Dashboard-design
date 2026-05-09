import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import IconButton from './IconButton'

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
}) {
  const prefersReducedMotion = useReducedMotion()

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`
                w-full ${sizes[size]}
                bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl
                pointer-events-auto
              `}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-describedby={description ? 'modal-description' : undefined}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div>
                  {title && (
                    <h2 id="modal-title" className="text-lg font-semibold text-white">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-sm text-neutral-400 mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <IconButton
                    label="关闭"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                  >
                    <X className="w-4 h-4" />
                  </IconButton>
                )}
              </div>

              <div className="p-5">
                {children}
              </div>

              {footer && (
                <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5 bg-neutral-900/50 rounded-b-2xl">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export function ModalCard({ children, className = '' }) {
  return (
    <div className={`bg-neutral-800/50 rounded-xl p-4 border border-white/5 ${className}`}>
      {children}
    </div>
  )
}

export function ModalSection({ title, children }) {
  return (
    <div className="space-y-3">
      {title && (
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{title}</h4>
      )}
      {children}
    </div>
  )
}

export default Modal
