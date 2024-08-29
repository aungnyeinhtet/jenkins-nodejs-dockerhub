export class MyanmarPhoneValidator {
  private phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  private sanitizeInput(phoneNumber: string): string {
    return phoneNumber.trim().replace(/[- )(]/g, '');
  }

  public getPhoneDetails(): { phoneNumber: string; operator: string | null } {
    const phoneNumber = this.normalizeInput(this.phoneNumber);
    return this.getTelecomOperator(phoneNumber);
  }

  private normalizeInput(phoneNumber: string): string {
    // TODO: convert Myanmar number if necessary
    return this.sanitizeInput(phoneNumber);
  }

  private cleanDoubleCountryCode(phoneNumber: string): string {
    const replacer = phoneNumber.replace(/^\+?95959/, '');
    return phoneNumber.replace(/^\+?95950?9\d{7,9}$/, replacer);
  }

  private checkValidNumber(phoneNumber: string): boolean {
    const sanitizedNumber = this.sanitizeInput(phoneNumber);
    return this.checkCommonPhoneNumber(sanitizedNumber);
  }

  private checkCommonPhoneNumber(phoneNumber: string): boolean {
    return /^(09|\+?950?9|\+?95950?9)\d{7,9}$/.test(phoneNumber);
  }

  private isMEC(phoneNumber: string): boolean {
    return /^(09|\+?959)3\d{7}$/.test(phoneNumber);
  }

  private isMPT(phoneNumber: string): boolean {
    return /^(09|\+?959)(2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26[0-5]\d{6}|40[0-4]\d{6}|42\d{7}|44[0-589]\d{6}|45\d{7}|87\d{7}|88\d{7}|89[6789]\d{6})$/.test(
      phoneNumber,
    );
  }

  private isMytel(phoneNumber: string): boolean {
    return /^(09|\+?959)6\d{8}$/.test(phoneNumber);
  }

  private isOoredoo(phoneNumber: string): boolean {
    return /^(09|\+?959)9\d{8}$/.test(phoneNumber);
  }

  private isMeta(phoneNumber: string): boolean {
    return /^(09|\+?959)7\d{8}$/.test(phoneNumber);
  }

  private getTelecomOperator(phoneNumber: string): {
    phoneNumber: string;
    operator: string | null;
  } {
    if (this.isMEC(phoneNumber)) return { phoneNumber, operator: 'MEC' };
    if (this.isMPT(phoneNumber)) return { phoneNumber, operator: 'MPT' };
    if (this.isMytel(phoneNumber)) return { phoneNumber, operator: 'Mytel' };
    if (this.isOoredoo(phoneNumber))
      return { phoneNumber, operator: 'Ooredoo' };
    if (this.isMeta(phoneNumber)) return { phoneNumber, operator: 'Atom' };
    return { phoneNumber, operator: null };
  }
}
