import React from 'react';
import Seperator from '../components/seperator';
import Card from '../components/card';
import Clock from '../components/clock';
import style from './dashboard.less';

const Dashboard = () => (
  <div className={style.container}>
    <div className={style.rowseperator} />
    <div className={style.row}>
      <Seperator />
      <Card>
        <Clock />
      </Card>
      <Seperator />
      <Card />
      <Seperator />
    </div>
    <div className={style.rowseperator} />
  </div>
);

export default Dashboard;
