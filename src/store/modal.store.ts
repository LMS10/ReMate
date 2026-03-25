'use client';

import { create } from 'zustand';

type ModalType =
  | { type: 'createWorkspace' }
  | { type: 'invite' }
  | { type: 'confirm'; message: string; onConfirm: () => Promise<void> | void }
  | null;

type ModalStore = {
  modal: ModalType;
  open: (modal: ModalType) => void;
  close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: (modal) => set({ modal }),
  close: () => set({ modal: null }),
}));
