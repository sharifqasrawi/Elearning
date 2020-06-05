export class DynamicLocaleId extends String {
    locale: string;
  
    toString() {
      return this.locale;
    }
  }
  