export const IS_DEV = process.env.NODE_ENV === 'development';
export const DEFAULT_TAKE = 20;

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};
export const ACCESS_TOKEN_EXPIRES_IN = '365d';

// MYTEL
export const MYTEL_API_URL = process.env.MYTEL_API_URL;
export const MYTEL_USERNAME = process.env.MYTEL_USERNAME;
export const MYTEL_PASSWORD = process.env.MYTEL_PASSWORD;
export const MYTEL_API_ROUTES = {
  AUTH: 'api/TokenAuth/AuthenticateAPI',
  SENT_SMS: 'services/app/MessageAPI/CreateMessage',
  GET_SMS_ACCOUNT: 'api/services/app/Session/GetSMSAccount',
};
