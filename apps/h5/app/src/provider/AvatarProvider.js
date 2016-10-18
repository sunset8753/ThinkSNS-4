import AvatarStore from '../store/AvatarStore.js';
import AvatarContainer from '../container/AvatarContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

const AvatarProvider = createStoreProvider(AvatarStore, AvatarContainer);

export default AvatarProvider;