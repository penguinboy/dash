import { createAction } from 'redux-actions';
import { Groceries } from 'core/api/airtable';

export const actionTypes = {
  GET_GROCERIES: 'GET_GROCERIES'
};

const receiveGroceries = createAction(actionTypes.GET_GROCERIES);

export const getGroceries = () => (
  dispatch => (
    Groceries.unpurchased()
      .then(results => dispatch(receiveGroceries(results)))
  )
);
