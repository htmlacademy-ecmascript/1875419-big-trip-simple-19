import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_AND_MONTH = 'DD MMM';
const DATE_FORMAT_TIME = 'HH:mm';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const parseDate = (date) => dayjs(date);
const getDayAndMonth = (date) => parseDate(date).format(DATE_FORMAT_DATE_AND_MONTH);
const getTime = (date) => parseDate(date).format(DATE_FORMAT_TIME);
const getDate = (date) => parseDate(date).format(DATE_FORMAT);

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const isStartDateExpired = (dateFrom) => dayjs(dateFrom).isAfter(dayjs());

const isEndDateExpired = (dateTo) => dayjs(dateTo).isAfter(dayjs());

const isFutureEvent = (dateFrom, dateTo) => isStartDateExpired(dateFrom) && isEndDateExpired(dateTo);
const isPastEvent = (dateTo) => dayjs(dateTo).isSameOrBefore(dayjs());
const isPresentEvent = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore(dayjs()) && dayjs(dateTo).isSameOrAfter(dayjs());

export {
  getDate,
  getDayAndMonth,
  getTime,
  isDatesEqual,
  isFutureEvent,
  isPresentEvent,
  isPastEvent
};
