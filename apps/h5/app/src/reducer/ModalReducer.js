import { SET_MODAL, CLOSE_MODAL, closeModal } from '../action/ModalAction.js';

const ModalReducer = (state, action) => {
  if (action.type === SET_MODAL) {
    return {
      settings: {
        isOpen: true,
        // onAction: closeModal,
        onDismiss: closeModal,
        ...action.settings,
      }
    };
  } else if (action.type === CLOSE_MODAL) {
    return {
      settings: {
        ...state.settings,
        isOpen: false,
      }
    }
  }

  return state;
};

export default ModalReducer;