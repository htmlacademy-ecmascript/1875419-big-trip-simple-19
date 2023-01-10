import { options } from '../utils/sort.js';

const getSort = () =>
  Object.entries(options).map(([optionName, isDisabledOption]) => ({
    name: optionName,
    disabled: isDisabledOption(optionName),
  }));

export { getSort };
