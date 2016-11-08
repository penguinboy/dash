import { connect } from 'react-redux';
import { toggleSelected, toggleEdit } from 'core/actions';
import { groceries } from 'core/selectors';

import ListItem from './listitem';

const mapStateToProps = (state, ownProps) => ({
  selected: groceries(state).isSelected(ownProps.item.id),
  editing: groceries(state).isEditing(state, ownProps.item.id)
});

const mapDispatchToProps = ({
  onSelect: toggleSelected,
  onEdit: toggleEdit
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
