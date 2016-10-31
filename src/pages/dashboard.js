import React from 'react';
import Calendar from '../components/Calendar';
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
      <Card>
      <img className={style.logo} src="https://dl.dropboxusercontent.com/s/041odlx4mo95g7u/logo.png" alt="HTML5 Icon" />
      </Card>
      <Seperator />
      <Card>
        <Clock />
      </Card>
    </div>
    <div className={style.rowseperator} />
    <Calendar />
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
  <div className={style.rowseperator} />
    
  </div>
);

export default Dashboard;
