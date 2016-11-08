import { connect } from 'react-redux';
import { addGrocery } from 'core/actions';
import AddItem from './add-item';

const mapDispatchToProps = ({
  addGrocery
});

export default connect(
  null,
  mapDispatchToProps
)(AddItem);
