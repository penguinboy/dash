import React from 'react';
import { Calendar } from 'core/api/airtable';
import Event from './event';
import style from './calendar.less';

const eventComponents = events => (
  events.map(event => <Event key={event.id} {...event} />)
);

class CalendarWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      past: []
    };
  }
  componentWillMount() {
    const upcoming = Calendar.upcoming()
      .then((events) => {
        this.setState({
          upcoming: events
        });
      });

    const past = Calendar.past()
      .then((events) => {
        this.setState({
          past: events
        });
      });

    upcoming.then(past)
      .then(() => {
        console.log(this.state);
      });
  }
  render() {
    return (
      <div className={style.calendar}>
        <h1>Calendar</h1>
        {eventComponents(this.state.upcoming)}
        <h2>Recently</h2>
        {eventComponents(this.state.past)}
      </div>
    );
  }
}

export default CalendarWidget;
