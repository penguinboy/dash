import React from 'react';
import Seperator from '../components/seperator';
import Card from '../components/card';
import Clock from '../components/clock';
import style from './dashboard.less';
import WeatherCard from '../components/weathercard';

const Dashboard = () => (
  <div className={style.container}>
    <div className={style.rowseperator} />
    <div className={style.row}>
      <Seperator />
      <Seperator />
      <Seperator />
      <Seperator />
      <Seperator />
      <Card>
        <Clock />
      </Card>
      <Seperator />
    </div>
    <div className={style.rowseperator} />
    <div className={style.rowtwo}>
      <WeatherCard> hello </WeatherCard>
    </div>
  </div>
);

export default Dashboard;
