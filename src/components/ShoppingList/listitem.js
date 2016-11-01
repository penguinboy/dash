import React from 'react';
import style from './listitem.less';


class ListItem extends React.Component {
  onClick(item) {
    console.log(this, item);
  }
  render() {
    const fields = this.props.fields;
    return (
      <div className={style.item} onClick={this.onClick}>
        <div className={style.name}>{fields.Item}</div>
        <div className={style.quantity}>{fields.Quantity}</div>
      </div>
    );
  }
}

export default ListItem;
