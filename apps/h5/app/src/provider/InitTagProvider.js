import InitTagStore from '../store/InitTagStore.js';
import InitTagContainer from '../container/InitTagContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

const InitTagProvider = createStoreProvider(InitTagStore, InitTagContainer);

export default InitTagProvider;