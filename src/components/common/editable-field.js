import React, { PropTypes } from 'react';
import InlineInput from './inline-input';

const MODE_VIEW = 'VIEW';
const MODE_EDIT = 'EDIT';

class EditableField extends React.Component {
  componentWillMount() {
    this.setState({
      mode: MODE_VIEW
    });
    this.clickHandler = (e) => {
      e.preventDefault();
      this.setState({
        mode: MODE_EDIT
      });
    };
    this.onChange = (value) => {
      this.props.onSave(value);
      this.setState({
        mode: MODE_VIEW
      });
    };
  }
  renderInput() {
    return (
      <InlineInput defaultValue={this.props.text} onSave={this.onChange} onFocus={this.props.onEdit} />
    );
  }
  renderLabel() {
    return this.props.text;
  }
  render() {
    const { text, onSave, onEdit, ...otherProps } = this.props;
    const { mode } = this.state;
    return (
      <div {...otherProps} onDoubleClick={this.clickHandler}>
        { mode === MODE_VIEW ? this.renderLabel() : this.renderInput() }
      </div>
    );
  }
}

EditableField.propTypes = {
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  text: PropTypes.string
};

export default EditableField;
