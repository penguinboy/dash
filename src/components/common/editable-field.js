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
    this.onChange = onSave => ((value) => {
      onSave(value);
      this.setState({
        mode: MODE_VIEW
      });
    });
  }
  render() {
    const { text, onSave, onEdit, ...otherProps } = this.props;
    const { mode } = this.state;

    const renderLabel = () => (<span>{text}</span>);
    const renderInput = () => (
      <InlineInput defaultValue={text} onSave={this.onChange(onSave)} onFocus={onEdit} />
    );

    return (
      <div {...otherProps} onDoubleClick={this.clickHandler}>
        { mode === MODE_VIEW ? renderLabel() : renderInput() }
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
