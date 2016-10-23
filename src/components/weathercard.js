import React from 'react';

import style from './weathercard.less';

class WeatherCard extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className={style.weathercard}>
        { props.children }
      </div>
    );
  }
}

export default WeatherCard;
