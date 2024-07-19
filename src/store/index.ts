import { configureStore } from "@reduxjs/toolkit";

import { middleware } from "@/middleware/middleware";

import drinkHistoryReducer from "@/store/drinkHistory";
import userDataReducer from "@/store/userData";
import generalReducer from "@/store/general";
import modalReducer from "@/store/modal";

const store = configureStore({
  reducer: {
    drinkHistory: drinkHistoryReducer,
    userData: userDataReducer,
    general: generalReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /** Ignore serialization checks for
       * the ActionModal to be able to save
       * the functions onConfirm and onCancel
       * in the redux store
       */
      serializableCheck: {
        ignoredActions: [
          "modal/setModalActive",
          "modal/setModalContent",
          "modal/setModal",
        ],
        ignoredPaths: [
          "modal.modalContent.onConfirm",
          "modal.modalContent.onCancel",
        ],
      },
    }).concat(middleware),
});
export default store;
