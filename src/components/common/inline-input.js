import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import style from './inline-input.less';

class InlineInput extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }
  save(e) {
    e.preventDefault();
    this.props.onSave(
      this.refs.input.value
    );
  }
  render() {
    const { onSave, onFocus, ...otherProps } = this.props;
    console.log(this.props);
    return (
      <form className={style.form} onSubmit={e => this.save(e)} onFocus={onFocus}>
        <input ref="input" type="text" {...otherProps} onBlur={e => this.save(e)} />
      </form>
    );
  }
}

InlineInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  onFocus: PropTypes.func
};

export default InlineInput;
