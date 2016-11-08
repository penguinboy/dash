import React, { PropTypes } from 'react';
import style from './add-item.less';

class AddItem extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.addGrocery(this.input.value)
      .then(() => {
        this.input.value = '';
        this.input.blur();
      });
  }
  render() {
    return (
      <form className={style.form} onSubmit={e => this.onSubmit(e)}>
        <input ref={(c) => { this.input = c; }} type="text" placeholder="What else do we need?" />
      </form>
    );
  }
}

AddItem.propTypes = {
  addGrocery: PropTypes.func.isRequired
};

export default AddItem;
