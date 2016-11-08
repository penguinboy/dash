import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import EditableField from 'components/common/editable-field';
import style from './listitem.less';

const styles = {
  selected: style.selectedItem,
  purchased: style.purchasedItem
};

var cx = classNames.bind(styles);

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };

    this.clickHandler = _.debounce((e, clickThrough) => {
      e.preventDefault();
      clickThrough();
    }, 200, { leading: true, trailing: false });
  }
  setField(override) {
    const nextState = {
      ...this.props.item,
      ...this.state,
      fields: {
        ...this.props.item.fields,
        ...this.state.fields,
        ...override
      }
    };
    this.setState(nextState);
    this.props.onSave(nextState);
  }

  render() {
    const { item, selected, onEdit, onSelect, onDelete } = this.props;

    const renderEditable = (text, save, className) => {
      const displayText = text || '';
      return (
        <EditableField
          className={cx(style.detail, className)} text={displayText}
          onSave={value => this.setField(save(value))}
          onEdit={() => onEdit(item.id)}
        />
      );
    };

    const selectCurrentItem = e => (
      this.clickHandler(e, () => onSelect(item.id))
    );

    const renderControls = () => (
      <a className={style.delete} onClick={(e) => {
        e.preventDefault();
        onDelete(item);
      }}>
        <i
          className={cx('material-icons')}
        >delete forever</i>
      </a>
    );

    return (
      <div className={cx(style.item, { selected: selected }, { purchased: this.state.fields.Purchased })} onClick={selectCurrentItem}>
        <div className={style.fields}>
          { renderEditable(item.fields.Item, value => ({ Item: value }), style.itemName) }
          { renderEditable(item.fields.Quantity, value => ({ Quantity: value })) }
          <div className={style.subdetail} onClick={e => e.stopPropagation()}>
            <input
              type="checkbox"
              defaultChecked={this.state.fields.Purchased}
              onChange={() => this.setField({ Purchased: !this.state.fields.Purchased })}
            />
          </div>
        </div>
        <div className={style.controls}>
          { selected ? renderControls() : ''}
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
};

export default ListItem;
