import ModalStore from '../store/ModalStore.js';
import ModalContainer from '../container/ModalContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

const ModalProvider = createStoreProvider(ModalStore, ModalContainer);

export default ModalProvider;