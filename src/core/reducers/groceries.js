import { handleAction } from 'redux-actions';
import { actionTypes } from 'core/actions';

export const INITIAL_GROCERIES = {
  unpurchased: []
};

export const groceries = handleAction(actionTypes.GET_GROCERIES, {
  next(state, action) {
    return {
      ...state,
      unpurchased: action.payload,
      loading: false
    };
  },
  throw(state) {
    return {
      ...state,
      loading: false
    };
  }
}, INITIAL_GROCERIES);
