import React from 'react';
import { getWeatherData } from '../core/api/bom';
import style from './weathercard.less';

class WeatherCard extends React.Component {
  componentDidMount() {
    this.updateWeather();
  }

  updateWeather() {
    getWeatherData()
      .then((weather) => {
        console.log('Fetched weather', weather);
        this.setState({
          temp: weather.item.condition.temp,
          text: weather.item.condition.text
        });
      });
  }

  render() {
    const state = this.state || {};
    return (
      <div className={style.weathercard}>
        {state.temp}
      </div>
    );
  }
}

export default WeatherCard;
