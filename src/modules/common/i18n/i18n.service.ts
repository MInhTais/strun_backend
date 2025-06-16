import { Injectable } from '@nestjs/common';
import { validationMessages } from './validation.messages';
import { responseMessages } from './response.messages';

@Injectable()
export class I18nService {
  private defaultLanguage = 'en';

  constructor() {}

  setLanguage(lang: string) {
    this.defaultLanguage = lang;
  }

  getMessage(path: string, lang?: string): string {
    const language = lang || this.defaultLanguage;

    // Try to get message from response messages first
    const responseMsg = this.getNestedValue(responseMessages[language], path);
    if (responseMsg) return responseMsg;

    // If not found in response messages, try validation messages
    const validationMsg = this.getNestedValue(
      validationMessages[language],
      path,
    );
    if (validationMsg) return validationMsg;

    // If not found in both, return the path
    return path;
  }

  private getNestedValue(
    obj: Record<string, unknown>,
    path: string,
  ): string | undefined {
    const keys = path.split('.');
    let value: unknown = obj;

    for (const key of keys) {
      if (typeof value !== 'object' || value === null) return undefined;
      value = (value as Record<string, unknown>)[key];
    }

    return typeof value === 'string' ? value : undefined;
  }
}
