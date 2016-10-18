import createStoreProvider from '../util/createStoreProvider.js';
import EduFriendFeedStore from '../store/EduFriendFeedStore.js';
import EduFriendFeedContainer from '../container/EduFriendFeedContainer.js';

const EduFriendFeedProvider = createStoreProvider(EduFriendFeedStore, EduFriendFeedContainer);;

export default EduFriendFeedProvider;