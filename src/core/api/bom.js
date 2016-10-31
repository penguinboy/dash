import $ from 'jquery';

export const getWeatherData = () => (
  $.get('//query.yahooapis.com/v1/public/yql?q=select * from weather.forecast' +
    ' where u="c" and woeid in (select woeid from geo.places(1) where ' +
    'text="melbourne, vic")&format=json')
    .then(data => (
      data.query.results.channel
    ))
);
