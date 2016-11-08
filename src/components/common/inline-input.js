import React, { PropTypes } from 'react';
import style from './inline-input.less';

class InlineInput extends React.Component {
  componentDidMount() {
    this.input.focus();
  }
  save(e) {
    e.preventDefault();
    this.props.onSave(
      this.input.value
    );
  }
  render() {
    const { onFocus, defaultValue } = this.props;
    return (
      <form className={style.form} onSubmit={e => this.save(e)} onFocus={onFocus}>
        <input
          type="text"
          defaultValue={defaultValue}
          ref={(ref) => { this.input = ref; }}
          onBlur={e => this.save(e)}
        />
      </form>
    );
  }
}

InlineInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  defaultValue: PropTypes.string
};

export default InlineInput;
