import { SizeXL, SizeXS } from '../../common';

export type ButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'secondary-destructive'
  | 'accent'
  | 'flat'
  | 'outline'
  | 'mono'
  | 'icon'
  | 'whiteblock'
  | 'whiteblock-active';

export type ButtonSize = SizeXL | SizeXS;

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonShape = 'square' | 'rounded' | null;
