import React, { PropTypes } from 'react';
import ListItem from './listitem';
import style from './list.less';

const renderItems = items => (
  items.map(item => <ListItem key={item.id} {...item} />)
);

class List extends React.Component {
  componentDidMount() {
    this.props.getGroceries();
  }
  render() {
    const { unpurchased } = this.props;
    console.log('Render', this.props);
    return (
      <div className={style.list}>
        <h1>List { unpurchased.length }</h1>
        <div>
          { unpurchased ? renderItems(unpurchased) : undefined }
        </div>
      </div>
    );
  }
}

List.propTypes = {
  unpurchased: PropTypes.array,
  getGroceries: PropTypes.func
};

export default List;
