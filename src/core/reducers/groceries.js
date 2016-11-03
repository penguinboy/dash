import { handleAction } from 'redux-actions';
import _ from 'lodash';
import { actionTypes, saveGroceries } from 'core/actions';
import { Groceries } from 'core/api/airtable';
import { groceriesSelectors } from '../selectors';

export const INITIAL_GROCERIES = {
  items: [],
  selected: [],
  editing: []
};

export const groceries = (state = INITIAL_GROCERIES, action) => {
  const selectors = groceriesSelectors(state);

  const selectItem = (id) => (
    selectors.isSelected(id) ? {...state} : {
      ...state,
      selected: [...state.selected, id]
    }
  );

  const deselectItem = (id) => (
    !selectors.isSelected(id) ? {...state } : {
      ...state,
      selected: state.selected.filter(itemId => id != itemId)
    }
  );

  switch (action.type) {
    case actionTypes.GET_GROCERIES:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case actionTypes.GROCERIES_SELECT:
      let isSelected = selectors.isSelected(action.payload);
      if (!isSelected) {
        return selectItem(action.payload);
      } else {
        return deselectItem(action.payload);
      }
    case actionTypes.GROCERIES_EDIT:
      let items = selectors.getItems();
      const item = selectors.getItem(action.payload.id);
      items = _.without(items, item);
      items.push({
        ...action.payload,
        dirty: true
      });

      return {
        ...state,
        items: [...items],
        dirty: true
      };
    case actionTypes.GROCERIES_SELECT_EDIT:
      let editing = selectors.getEditing();
      if (editing.includes(action.payload)) {
        editing = editing.filter(id => id != action.payload);
      } else {
        editing.push(action.payload);
      }

      state = selectItem(action.payload);
      return {
        ...state,
        editing
      };
    case actionTypes.GROCERIES_SAVE:
      const newItems = selectors.getItems()
        .map(item => ({
          ...item,
          dirty: false
        }));
      return {
        ...state,
        items: newItems,
        dirty: false
      };
    default:
      console.log('Got to default');
      return state;
  }
};

export const selectGroceries = handleAction(actionTypes.GROCERIES_SELECT, {
  next(state, action) {
    console.log('Selected item', state, action);
    return {
      ...state
    };
  },
  throw(state) {
    return {
      ...state
    };
  }
}, INITIAL_GROCERIES);
