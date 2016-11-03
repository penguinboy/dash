import { createAction } from 'redux-actions';
import { Groceries } from 'core/api/airtable';
import { groceries as groceriesSelector } from './selectors';

export const actionTypes = {
  GET_GROCERIES: 'GET_GROCERIES',
  GROCERIES_SELECT: 'GROCERIES_SELECT',
  GROCERIES_EDIT: 'GROCERIES_EDIT',
  GROCERIES_SELECT_EDIT: 'GROCERIES_SELECT_EDIT',
  GROCERIES_SAVE: 'GROCERIES_SAVE'
};

const receiveGroceries = createAction(actionTypes.GET_GROCERIES);
export const getGroceries = () => (
  dispatch => (
    Groceries.unpurchased()
      .then(results => dispatch(receiveGroceries(results)))
  )
);

const saveGroceriesAction = createAction(actionTypes.GROCERIES_SAVE);
export const persistGroceries = (items) => (
  dispatch => {
    return items.filter(item => item.dirty)
      .reduce((a, b) => {
        return a.then(Groceries.save(b));
      }, new Promise(resolve => resolve()))
      .then(() => dispatch(saveGroceriesAction()));
  }
);

const groceriesSelect = createAction(actionTypes.GROCERIES_SELECT);
export const toggleSelected = (id) => (
  dispatch => dispatch(groceriesSelect(id))
);

const groceriesEdit = createAction(actionTypes.GROCERIES_EDIT);
export const editGrocery = (item) => (
  dispatch => {
    return new Promise(resolve => resolve(dispatch(groceriesEdit(item))));
  }
);

const groceriesSelectEdit = createAction(actionTypes.GROCERIES_SELECT_EDIT);
export const toggleEdit = (id) => (
  dispatch => dispatch(groceriesSelectEdit(id))
);
