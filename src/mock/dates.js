import dayjs from 'dayjs';
import { getRandomInteger } from './util';
import { TimeRanges } from '../const';

const getRandomDate = () =>
  dayjs().add(getRandomInteger(TimeRanges.DAYS.MIN, TimeRanges.DAYS.MAX), 'day')
    .add(getRandomInteger(TimeRanges.HOURS.MIN, TimeRanges.HOURS.MAX), 'hour')
    .add(getRandomInteger(TimeRanges.MINUTES.MIN, TimeRanges.MINUTES.MAX), 'minute');


const getRandomDates = () => {
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  if (date2.isAfter(date1)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString()
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString()
  };
};

export { getRandomDates };
