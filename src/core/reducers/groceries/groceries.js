import { handleAction } from 'redux-actions';
import _ from 'lodash';
import { actionTypes } from 'core/actions';
import { groceriesSelectors } from 'core/selectors';

const INITIAL_GROCERIES = {
  items: [],
  selected: [],
  editing: [],
  deleted: []
};

const groceries = (state = INITIAL_GROCERIES, action) => {
  const selectors = groceriesSelectors(state);

  const toggleItem = (exists, collection = [], matcher, item) => (
    exists ? collection.filter(matcher) : [...collection, item]
  );

  const selectItem = id => (
    selectors.isSelected(id) ? { ...state } : {
      ...state,
      selected: [...state.selected, id]
    }
  );
  const deselectItem = id => (
    !selectors.isSelected(id) ? { ...state } : {
      ...state,
      selected: state.selected.filter(itemId => id !== itemId)
    }
  );

  const getGroceries = () => ({
    ...state,
    items: action.payload,
    loading: false
  });
  const toggleSelect = () => (
    selectors.isSelected(action.payload) ? selectItem(action.payload) : deselectItem(action.payload)
  );
  const toggleEdit = () => {
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
  }

  const editGrocery = () => {
    const item = selectors.getItem(action.payload.id);
    items = _.without(selectors.getItems(), item);
    items.push({
      ...action.payload,
      dirty: true
    });

    return {
      ...state,
      items: [...items],
      dirty: true
    };
  };

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
        return {
          ...state,
          selected: [action.payload]
        };
      } else {
        return {
          ...state,
          selected: []
        };
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
      const deleted = selectors.getDeleted()
        .map(item => ({
          ...item,
          dirty: false
        }));

      return {
        ...state,
        items: newItems,
        deleted: deleted,
        dirty: false
      };
    case actionTypes.GROCERIES_ADD:
      const newItem = {
        fields: {
          Item: action.payload
        },
        dirty: true
      };

      return {
        ...state,
        items: [...state.items, newItem],
        dirty: true
      };
    case actionTypes.GROCERIES_DELETE:
      const filteredItems = selectors.getItems()
        .filter(item => item.id !== action.payload);
      const deletedItems = _.difference(selectors.getItems(), filteredItems)
        .map(item => ({
          ...item,
          dirty: true
        }));
      return {
        ...state,
        items: filteredItems,
        deleted: [...state.deleted, ...deletedItems]
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

export default groceries;
