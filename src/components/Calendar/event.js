import React from 'react';
import style from './event.less';

//const formatDate = date => date.from(moment().startOf('day'));
const formatDate = date => date.calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse(now) {
    if (this.isBefore(now)) {
      return `[${this.startOf('day').fromNow()}]`;
    }
    return `[${this.startOf('day').fromNow()}]`;
  }
});

const Event = ({ date, fields }) => (
  <div className={style.event}>
    <div className={style.name}>{fields.Name}</div>
    <div className={style.date}>{formatDate(date)}</div>
  </div>
);

export default Event;
