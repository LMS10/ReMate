'use client';

import { useModalStore } from '../../store/modal.store';
import ConfirmModal from './contents/ConfirmModal';
import CreateWorkspaceModal from './contents/CreateWorkspaceModal';
import InviteModal from './contents/InviteModal';
import Modal from './Modal';

export default function ModalRoot() {
  const { modal, close } = useModalStore();

  if (!modal) return null;

  return (
    <Modal onClose={close}>
      {modal.type === 'createWorkspace' && <CreateWorkspaceModal onClose={close} />}

      {modal.type === 'invite' && <InviteModal onClose={close} />}

      {modal.type === 'confirm' && (
        <ConfirmModal message={modal.message} onConfirm={modal.onConfirm} onClose={close} />
      )}
    </Modal>
  );
}
