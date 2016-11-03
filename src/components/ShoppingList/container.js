// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGroceries, markGroceriesSelected, editGrocery, persistGroceries as persist } from 'core/actions';
import { selectGroceries } from 'core/selectors';
import List from './list';

const mapStateToProps = state => ({
  unpurchased: selectGroceries(state)
});

const mapDispatchToProps = ({
  getGroceries,
  editGrocery,
  persist,
  markGroceriesSelected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
