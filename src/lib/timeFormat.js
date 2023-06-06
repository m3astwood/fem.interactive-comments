import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const ta = new TimeAgo('en-GB');

export default (date) => {
  return ta.format(new Date(date), 'round');
};
