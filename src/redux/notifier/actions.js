import actionTypes from './actionTypes';

export const enqueueSnackbar = notification => ({
  type: actionTypes.ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbar = key => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});
