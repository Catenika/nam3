import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Check input date is within numbers of date (by day)
 * @param source Input date string
 * @returns true if it is, overwise false
 */
export const isWithinDays: (source?: string) => boolean = (source) => {
  const sevenDaysAgo = dayjs().subtract(7, 'day');
  return dayjs(source).isAfter(sevenDaysAgo);
};

/**
 * Convert input date to locale time string with template
 * @param source Input date
 * @param template string (default: DATE_FORMAT.DATE)
 * @returns locale time string
 */
export const convertTimeFormat: (source?: string, template?: string) => string = (
  source,
  template = 'YYYY/MM/DD HH:mm:ss',
) => {
  return dayjs(source).utc().local().format(template);
};
