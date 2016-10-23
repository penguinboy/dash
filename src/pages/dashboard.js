import React from 'react';
import Seperator from '../components/seperator';
import IconSeperator from '../components/iconseperator';
import Card from '../components/card';
import Clock from '../components/clock';
import style from './dashboard.less';
import WeatherCard from '../components/weathercard';
import Iconbay from '../components/iconbay';

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
    </div>
    <div className={style.rowseperator} />
    <div className={style.rowtwo}>
      <WeatherCard />
      <div className={style.iconcontainer}>
        <div className={style.iconrow}>
          <Iconbay />
          <IconSeperator />
          <Iconbay />
          <IconSeperator />
          <Iconbay />
          <IconSeperator />
        </div>
        <div className={style.iconrow}>
          <Iconbay />
          <IconSeperator />
          <Iconbay />
          <IconSeperator />
          <Iconbay />
          <IconSeperator />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
