import Joi from 'joi';

/**
 * allow orderBy validation
 *
 * @param keys string[]
 * @returns
 */
export const allowedOrderBy =
  (keys: string[]) => (value: string, helpers: Joi.CustomHelpers<any>) => {
    const [field, direction] = value.split('=');

    if (direction && !['asc', 'desc'].includes(direction))
      return helpers.error('any.invalid');

    if (!keys.includes(field)) return helpers.error('any.invalid');

    return value;
  };

/**
 * allowed include relationship keys
 *
 * @param keys string[]
 * @returns
 */
export const allowedInclude =
  (keys: string[]) => (value: string, helpers: Joi.CustomHelpers<any>) => {
    const isValid = value
      .split(',')
      .every((item) => keys.includes(item.trim()));

    if (!isValid) return helpers.error('any.invalid');

    return value;
  };

/**
 * allowed filter
 *
 * @param key string[]
 */
export function allowedFilter(key: string[]) {
  console.log('key', key);
  //
}

export function isValidJwtTokenType(token: string): boolean {
  if (!token) return false;

  return token.split('.').length === 3;
}

export const validateMessage = ({ messageCount, is_burmese }: any) => {
  const messageLength = parseInt(messageCount);
  if (!is_burmese) {
    if (messageLength <= 160) {
      return 1;
    } else if (messageLength > 160 && messageLength < 306) {
      return 2;
    } else if (messageLength > 306 && messageLength < 459) {
      return 3;
    } else if (messageLength > 459 && messageLength < 612) {
      return 4;
    } else if (messageLength > 612 && messageLength < 765) {
      return 5;
    } else if (messageLength > 765) {
      return 5;
    } else {
      return null;
    }
  } else {
    if (messageLength <= 70) {
      return 1;
    } else if (messageLength > 70 && messageLength < 134) {
      return 2;
    } else if (messageLength > 134 && messageLength < 201) {
      return 3;
    } else if (messageLength > 201 && messageLength < 268) {
      return 4;
    } else if (messageLength > 268 && messageLength < 335) {
      return 5;
    } else if (messageLength > 335) {
      return 5;
    } else {
      return null;
    }
  }
};
