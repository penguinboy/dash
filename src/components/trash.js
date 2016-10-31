import React from 'react';
import moment from 'moment';
import style from './trash.less';

const isSunday = () => (
  moment().days() === 0 ? style.sunday : ''
);

const Trash = () => (
  <div className={style.trash}>
    <i className={'material-icons ' + isSunday()}>face</i>
  </div>
);

export default Trash;
