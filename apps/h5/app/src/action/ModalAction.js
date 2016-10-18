import ModalStore from '../store/ModalStore.js';

export const SET_MODAL = 'SET_MODAL';
export const createModalSettings = ({ node, ...settings }) => ({
  type: SET_MODAL,
  settings: {
    ...settings,
    node,
  }
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ModalStore.dispatch({
  type: CLOSE_MODAL,
});

export const modalAction = ({ node, ...settings }) => ModalStore.dispatch(createModalSettings({node, ...settings}));
export default modalAction;
