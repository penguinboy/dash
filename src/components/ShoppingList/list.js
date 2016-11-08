import React, { PropTypes } from 'react';
import _ from 'lodash';
import ListItemContainer from './listitem-container';
import AddItem from './add-item-container';
import style from './list.less';


class List extends React.Component {
  componentDidMount() {
    this.props.getGroceries();
  }
  persist() {
    const { persist } = this.props;
    const getItems = () => this.props.unpurchased;
    const getDeleted = () => this.props.deleted;

    return () => persist(getItems(), getDeleted());
  }
  editItem() {
    const { editGrocery } = this.props;
    const persist = this.persist();

    return item => (
      editGrocery(item).then(persist)
    );
  }
  deleteItem() {
    const { deleteGrocery } = this.props;
    const persist = this.persist();

    return item => (
      deleteGrocery(item).then(persist)
    );
  }
  renderItems() {
    if (!this.props.unpurchased) return undefined;
    return _.sortBy(this.props.unpurchased, item => item.id)
      .map(item => (
        <ListItemContainer key={item.id} item={item} onSave={this.editItem()} onDelete={this.deleteItem()} />)
      );
  }
  render() {
    const { unpurchased } = this.props;
    return (
      <div className={style.list}>
        <h1>Shopping list</h1>
        <div className={style.container}>
          { unpurchased ? this.renderItems() : undefined }
        </div>
        <AddItem />
      </div>
    );
  }
}

List.propTypes = {
  unpurchased: PropTypes.array,
  deleted: PropTypes.array,
  getGroceries: PropTypes.func,
  editGrocery: PropTypes.func,
  persist: PropTypes.func
};

export default List;
