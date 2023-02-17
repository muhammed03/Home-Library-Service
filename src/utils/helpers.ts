export const getMessage = (id = '') => {
  return {
    USER_NOT_FOUND: `User with id ${id} not found!`,
    ARTIST_NOT_FOUND: `Artist with id ${id} not found!`,
    NOT_VALID_ID: 'Not valid id',
    ARTIST_DELETED: `Artist with id ${id} successfully deleted`,
    NOT_VALID_BODY: `Body doesn't contain required fields`,
  };
};
