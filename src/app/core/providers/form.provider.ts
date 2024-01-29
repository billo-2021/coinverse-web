import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Provider } from '@angular/core';
import { of } from 'rxjs';
import { TUI_INPUT_CARD_GROUPED_TEXTS } from '@taiga-ui/addon-commerce';

export const FORM_PROVIDERS: Provider[] = [
  {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: 'This is required',
      email: 'Email is invalid',
    },
  },
  {
    provide: TUI_INPUT_CARD_GROUPED_TEXTS,
    useValue: of({
      cardNumberText: 'Number',
      expiryText: 'mm/yy',
      cvcText: 'Code',
    }),
  },
];
