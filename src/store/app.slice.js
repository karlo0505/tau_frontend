import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  status: "",
  message: "",
  drawerTitle: "",
  showDrawer: false,
  content: null,
  conditionalModal: false,
  selectedId: null,
  selectedEmail: null,
  deleteModal: false,
  openprintdrawer: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModal: (state, action) => ({
      ...state,
      openModal: true,
      message: action.payload.message,
      status: action.payload.status,
      title: action.payload.title,
    }),
    closeModal: (state, action) => ({
      ...state,
      openModal: false,
      message: action.payload.message,
      status: action.payload.status,
      title: action.payload.title,
    }),
    openDrawer: (state, action) => ({
      ...state,
      showDrawer: true,
      drawerTitle: action.payload.drawerTitle,
    }),
    closeDrawer: (state, action) => ({
      ...state,
      showDrawer: false,
      drawerTitle: action.payload.drawerTitle,
    }),
    showModalContent: (state, action) => ({
      ...state,
      title: action.payload.title,
      conditionalModal: true,
      content: action.payload.content,
      selectedId: action.payload.selectedId,
      selectedEmail: action.payload.selectedEmail,
    }),
    hideModalContent: (state, action) => ({
      ...state,
      title: action.payload.title,
      conditionalModal: false,
      content: action.payload.content,
      selectedEmail: action.payload.selectedEmail,
    }),
    showDeleteModal: (state, action) => ({
      ...state,
      deleteModal: true,
      content: action.payload.content,
    }),
    hideDeleteModal: (state, action) => ({
      ...state,
      deleteModal: false,
      content: action.payload.content,
    }),
    showPrintDrawer: (state, action) => ({
      ...state,
      openprintdrawer: action.payload,
    }),
  },
});

export const {
  showModal,
  closeModal,
  openDrawer,
  closeDrawer,
  hideModalContent,
  showModalContent,
  hideDeleteModal,
  showDeleteModal,
  showPrintDrawer,
} = appSlice.actions;

export default appSlice.reducer;
