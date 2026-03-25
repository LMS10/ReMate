'use client';

import { useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  hasInput?: boolean;
};

export default function Modal({ children, onClose, hasInput }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!hasInput) return;

    const input = containerRef.current?.querySelector('input');
    input?.focus();
  }, [hasInput]);

  if (typeof window === 'undefined') return null;
  const el = document.getElementById('modal-root');
  if (!el) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'
        onMouseDown={(e) => {
          if (e.target === overlayRef.current) {
            onClose();
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: hasInput ? undefined : false,
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
            returnFocusOnDeactivate: true,
          }}
        >
          <motion.div
            ref={containerRef}
            role='dialog'
            aria-modal='true'
            className='w-82.5 rounded-xl bg-white p-6 md:w-107.5'
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </FocusTrap>
      </motion.div>
    </AnimatePresence>,
    el,
  );
}
