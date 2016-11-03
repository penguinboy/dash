import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ListItemContainer from './listitem-container';
import style from './list.less';


class List extends React.Component {
  componentDidMount() {
    this.props.getGroceries();
  }
  persist() {
    const { editGrocery, persist, unpurchased } = this.props;
    const getItems = () => this.props.unpurchased;
    return item => (
      editGrocery(item).then(() => (persist(getItems())))
    );
  }
  renderItems() {
    if (!this.props.unpurchased) return undefined;
    return _.sortBy(this.props.unpurchased, item => item.id)
      .map(item => <ListItemContainer key={item.id} item={item} onSave={this.persist()}/>);
  }
  render() {
    const { unpurchased } = this.props;
    const dirty = unpurchased.filter(item => item.dirty).length;
    return (
      <div className={style.list}>
        <h1>List { `${unpurchased.length} ~${dirty}` }</h1>
        <div>
          { unpurchased ? this.renderItems() : undefined }
        </div>
      </div>
    );
  }
}

List.propTypes = {
  unpurchased: PropTypes.array,
  getGroceries: PropTypes.func,
  markGroceriesSelected: PropTypes.func,
  editGrocery: PropTypes.func,
  persist: PropTypes.func
};

export default List;
