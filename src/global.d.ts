interface ModalHandlers {
  onConfirm: () => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    modalHandlers: ModalHandlers;
  }
}

export {};
