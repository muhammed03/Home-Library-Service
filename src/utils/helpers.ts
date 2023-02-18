export const getMessage = (id = '') => {
  return {
    USER_NOT_FOUND: `User with id ${id} not found!`,
    ARTIST_NOT_FOUND: `Artist with id ${id} not found!`,
    ALBUM_NOT_FOUND: `Album with id ${id} not found!`,
    TRACK_NOT_FOUND: `Track with id ${id} not found!`,
    NOT_VALID_ID: 'Not valid id',
    NOT_VALID_BODY: `Body doesn't contain required fields`,
    ALREADY_EXISTS: 'Already exists!',
    NOT_FOUND: 'Not found!',
  };
};
