import { connect } from 'react-redux';
import { getGroceries, markGroceriesSelected, editGrocery, deleteItem, persistGroceries } from 'core/actions';
import { groceries } from 'core/selectors';
import List from './list';

const mapStateToProps = state => ({
  unpurchased: groceries(state).getItems(),
  deleted: groceries(state).getDeleted()
});

const mapDispatchToProps = ({
  getGroceries,
  editGrocery,
  deleteGrocery: deleteItem,
  persist: persistGroceries,
  markGroceriesSelected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
