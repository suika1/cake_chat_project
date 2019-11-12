import * as AT from './action-types';

export const selectMessageToEdit = ({ message }) => ({
  type: AT.SELECT_MESSAGE_TO_EDIT,
  payload: {
    message,
  },
});

export const deselectMessageToEdit = () => ({
  type: AT.DESELECT_MESSAGE_TO_EDIT,
});
