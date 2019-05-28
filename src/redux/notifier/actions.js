import actionTypes from './actionTypes';

export const enqueueSnackbar = notification => ({
  type: actionTypes.ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    message: notification.message,
    options: {
      autoHideDuration: 1700,
      variant: notification.variant
    }
  },
});

export const removeSnackbar = key => ({
  type: actionTypes.REMOVE_SNACKBAR,
  key,
});
