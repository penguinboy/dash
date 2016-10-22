import React from 'react';
import moment from 'moment';

import style from './clock.less';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 'test'
    };
  }
  componentDidMount() {
    this.updateTime();
    this.timerID = setInterval(
      () => this.updateTime(),
      500
    );
  }
  updateTime() {
    this.setState({
      time: moment().format('LTS')
    });
  }
  render() {
    return (
      <div className={style.clock}>
        { this.state.time }
      </div>
    );
  }
}

export default Clock;
