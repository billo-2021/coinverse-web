import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskEmail',
})
export class MaskEmailPipe implements PipeTransform {
  transform(email: string): unknown {
    if (!email || !email.includes('@')) {
      return email;
    }

    const [username, domain] = email.split('@');

    const maskedUsername = this.maskFromEnd(username, '.', 3);
    const maskedDomain = this.maskFromEnd(domain, '.', 3);

    return `${maskedUsername}@${maskedDomain}`;
  }

  private maskFromStart(input: string, inputMask: string, count: number): string {
    return input
      .split('')
      .map((char, index) => (index < count ? inputMask : char))
      .join('');
  }

  private maskFromEnd(input: string, inputMask: string, count: number): string {
    return input
      .split('')
      .map((char, index) => (index >= input.length - count ? inputMask : char))
      .join('');
  }
}
