import dayjs from 'dayjs';

const START_DATE = dayjs().toISOString();
const END_DATE = dayjs().add((1),'day').toISOString();

const DefaultNewPoint = {
  basePrice: 0,
  dateFrom: START_DATE,
  dateTo: END_DATE,
  destination: 1,
  id: 0,
  offers: [],
  type: 'taxi'
};

export {DefaultNewPoint};
