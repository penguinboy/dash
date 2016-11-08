import { createAction } from 'redux-actions';
import { Groceries } from 'core/api/airtable';
import { groceries as groceriesSelector } from './selectors';

export const actionTypes = {
  GET_GROCERIES: 'GET_GROCERIES',
  GROCERIES_SELECT: 'GROCERIES_SELECT',
  GROCERIES_EDIT: 'GROCERIES_EDIT',
  GROCERIES_SELECT_EDIT: 'GROCERIES_SELECT_EDIT',
  GROCERIES_SAVE: 'GROCERIES_SAVE',
  GROCERIES_ADD: 'GROCERIES_ADD',
  GROCERIES_DELETE: 'GROCERIES_DELETE'
};

const receiveGroceries = createAction(actionTypes.GET_GROCERIES);
export const getGroceries = () => (
  dispatch => (
    Groceries.unpurchased()
      .then(results => dispatch(receiveGroceries(results)))
  )
);

const saveGroceriesAction = createAction(actionTypes.GROCERIES_SAVE);
export const persistGroceries = () => (
  (dispatch, getState) => {
    const selector = groceriesSelector(getState());
    const items = selector.getItems();
    const deleted = selector.getDeleted();

    console.log('About to persist', items, deleted);

    const isDirty = item => item.dirty;
    const saveItems = items.filter(isDirty)
      .reduce((a, b) => a.then(Groceries.save(b)), Promise.resolve());
    const deleteItems = deleted.filter(isDirty)
      .reduce((a, b) => a.then(Groceries.delete(b)), Promise.resolve());

    return saveItems.then(deleteItems)
      .then(() => dispatch(saveGroceriesAction()));
  }
);


const addGroceriesAction = createAction(actionTypes.GROCERIES_ADD);
export const addGrocery = text => (
  (dispatch, getState) => (
    Promise.resolve(dispatch(addGroceriesAction(text)))
      .then(() => {
        const currentItems = groceriesSelector(getState()).getItems();
        return persistGroceries(currentItems)(dispatch);
      })
  )
);

const groceriesSelect = createAction(actionTypes.GROCERIES_SELECT);
export const toggleSelected = id => (
  dispatch => dispatch(groceriesSelect(id))
);

const groceriesDelete = createAction(actionTypes.GROCERIES_DELETE);
export const deleteItem = item => (
  dispatch => Promise.resolve(dispatch(groceriesDelete(item.id)))
);

const groceriesEdit = createAction(actionTypes.GROCERIES_EDIT);
export const editGrocery = item => (
  dispatch => new Promise(resolve => resolve(dispatch(groceriesEdit(item))))
);

const groceriesSelectEdit = createAction(actionTypes.GROCERIES_SELECT_EDIT);
export const toggleEdit = id => (
  dispatch => dispatch(groceriesSelectEdit(id))
);
