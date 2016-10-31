import moment from 'moment';
import airtableConfig from 'config/airtable.conf';
import request from '../request';

const apiBase = `https://api.airtable.com/v0/${airtableConfig.base}`;
const resource = (name, params) => {
  const url = new URL(`${apiBase}/${name}`);
  const requestParams = {
    api_key: airtableConfig.apiKey,
    ...params
  };
  Object.keys(requestParams).forEach(key => url.searchParams.append(key, requestParams[key]));
  return url;
};

const event = ({ id, fields }) => (
  {
    id,
    fields,
    date: moment(fields.Date)
  }
);

const returnEventRecords = response => (
  response.json()
    .then(json => json.records.map(record => event(record)))
);

export const Calendar = {
  all: () => (
    request.get(resource('House Calender'))
      .then(returnEventRecords)
  ),
  upcoming: () => (
    request.get(resource('House Calender', { view: 'Upcoming' }))
      .then(returnEventRecords)
  ),
  past: () => (
    request.get(resource('House Calender', { view: 'Past' }))
      .then(returnEventRecords)
  )
};
