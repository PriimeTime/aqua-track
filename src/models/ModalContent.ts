export interface ModalContent {
  modalText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  hasDecision?: boolean;
}
