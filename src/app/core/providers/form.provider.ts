import { TUI_VALIDATION_ERRORS } from "@taiga-ui/kit";
import { Provider } from "@angular/core";
import { TUI_INPUT_CARD_GROUPED_TEXTS } from "@taiga-ui/addon-commerce";
import { of } from "rxjs";

export const FORM_PROVIDERS: Provider[] = [
  {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: 'This is required',
      email: 'Email is invalid',
    }
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
