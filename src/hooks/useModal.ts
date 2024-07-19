import { useDispatch } from "react-redux";

import { setModalContent, setModalActive } from "@/store/modal";

import { ModalContent } from "@/models/ModalContent";

type UseModalReturn = [(modalContent: ModalContent) => void, () => void];

/**
 * Custom hook for managing action modal state.
 *
 * @returns A tuple with two functions:
 *          1. openModal: Function to open the modal with specified content.
 *          2. closeModal: Function to close the modal.
 */
function useModal(): UseModalReturn {
  const dispatch = useDispatch();

  const openModal = (content: ModalContent) => {
    dispatch(setModalContent(content));
    dispatch(setModalActive(true));
  };

  const closeModal = () => {
    dispatch(setModalActive(false));
  };

  return [openModal, closeModal];
}

export { useModal };
