export const groceriesSelectors = (parentState) => {
  const getItems = () => parentState.items;
  const getItem = (id) => {
    const matches = getItems().filter(item => item.id === id);
    if (!matches) return undefined;
    return matches[0];
  };
  const getSelected = () => parentState.selected;
  const isSelected = id => getSelected().includes(id);
  const getEditing = () => parentState.editing;
  const isEditing = id => getEditing().includes(id);
  return {
    getItems,
    getItem,
    isSelected,
    getEditing,
    isEditing,
    hasEdited: () => parentState.edited
  };
};

const globalGroceries = state => state.groceries;

export const groceries = (state) => {
  const selector = groceriesSelectors(globalGroceries(state));
  return {
    ...selector
  };
};

export const selectGroceries = state => (
  groceriesSelectors(globalGroceries(state)).getItems()
);
export const selectGroceryItem = (state, id) => (
  groceriesSelectors(globalGroceries(state)).getItem(id)
);
export const isSelected = (state, id) => (
  groceriesSelectors(globalGroceries(state)).isSelected(id)
);

export const isEditing = state => false;
