import NotificationStore from '../store/NotificationStore.js';
import NotificationContainer from '../container/NotificationContainer.js';
import createStoreProvider from '../util/createStoreProvider.js';

const NotificationProvider = createStoreProvider(NotificationStore, NotificationContainer);

export default NotificationProvider;