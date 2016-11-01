// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGroceries } from 'core/actions';
import { selectGroceries } from 'core/selectors';
import List from './list';

const mapStateToProps = state => ({
  unpurchased: selectGroceries(state).unpurchased
});

const mapDispatchToProps = ({
  getGroceries
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
