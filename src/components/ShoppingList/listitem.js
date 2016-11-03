import React, { PropTypes } from 'react';
import _ from 'lodash';
import EditableField from 'components/common/editable-field';
import style from './listitem.less';

class ListItem extends React.Component {
  componentWillMount() {
    this.state = {
      fields: {}
    };
    const props = this.props;
    this.clickHandler = _.debounce((e) => {
        e.preventDefault();
        return props.onSelect(props.item.id);
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
    console.log('nextState', nextState, override);
    this.setState(nextState);
    this.props.onSave(nextState);
  }

  render() {
    const { item, selected, onSave, onEdit} = this.props;

    const renderEditable = (text, save) => {
      const displayText = text || '';
      return (
        <EditableField
          className={style.detail} text={displayText}
          onSave={(value) => this.setField(save(value))}
          onEdit={() => onEdit(item.id)}
        />
      );
    };

    return (
      <div className={selected ? style.selectedItem : style.item} onClick={this.clickHandler}>
        { renderEditable(item.fields.Item, value => ({ Item: value })) }
        { renderEditable(item.fields.Quantity, value => ({ Quantity: value })) }
      </div>
    );
  }
}

ListItem.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
};

export default ListItem;
