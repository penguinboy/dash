import React from 'react';

import style from './card.less';

class Card extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className={style.card}>
        { props.children }
      </div>
    );
  }
}

export default Card;
