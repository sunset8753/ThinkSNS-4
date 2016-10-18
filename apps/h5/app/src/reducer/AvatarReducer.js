import { AVATAR_UPLOADING, AVATAR_DEFAULT, AVATAR_UPLOADED } from '../action/AvatarAction.js';

const AvatarReducer = (state, action) => {
  switch (action.type) {
    case AVATAR_DEFAULT:
      return {
        use_dingtalk_avatar: true,
        avatar_upload_status: false,
      };

    case AVATAR_UPLOADING:
      return {
        use_dingtalk_avatar: false,
        avatar_upload_status: true,
      }

    case AVATAR_UPLOADED:
      return {
        use_dingtalk_avatar: false,
        avatar_upload_status: false,
      };

    default:
      return state;
  }
};

export default AvatarReducer;