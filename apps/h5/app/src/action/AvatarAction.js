export const AVATAR_DEFAULT = 'AVATAR_DEFAULT';
export const AVATAR_UPLOADING = 'AVATAR_UPLOADING';
export const AVATAR_UPLOADED = 'AVATAR_UPLOADED';

export const createAvatarAction = (type = AVATAR_DEFAULT) => ({
  type,
});

export const setAvatarStatusAsync = (status) => (
  dispatch => dispatch(status)
);