import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class Mail {
  constructor(
    private from: string,
    private to: string | string[],
    private subject: string,
    private text: string,
    private html: string,
  ) {
    //
  }

  /**
   * send email
   *
   * @returns Promise<SMTPTransport.SentMessageInfo>
   */
  public async sendMail(): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = createTransport({
      host: 'mail.axratech.com',
      port: 465,
      secure: true,
      auth: {
        user: 'anh@axratech.com',
        pass: 'Ah2024##06',
      },
    });

    return await transporter.sendMail({
      from: this.from,
      to:
        typeof this.to === 'string' && !Array.isArray(this.to)
          ? this.to
          : this.to.join(','),
      subject: this.subject,
      text: this.text,
      html: this.html,
    });
  }
}
