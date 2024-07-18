import { Modal } from "@/models/Modal";
import { ModalContent } from "@/models/ModalContent";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Modal = {
  visible: false,
  modalContent: {
    modalText: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setModalContent: (state, action: PayloadAction<ModalContent>) => {
      state.modalContent = action.payload;
    },
    setModal: (state, action: PayloadAction<Modal>) => {
      state.visible = action.payload.visible;
      state.modalContent = action.payload.modalContent;
    },
  },
});

export const { setModalActive, setModalContent, setModal } = modalSlice.actions;

export default modalSlice.reducer;
