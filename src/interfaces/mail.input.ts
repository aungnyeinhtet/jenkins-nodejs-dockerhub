/**
 * Mail Input type
 * @param payload MailInput
 *
 */
export interface MailInput {
  from_email: string;
  to_email: string;
  subject: string;
  body?: string;
  html: string;
}
