type AppearanceType =
  | 'primary'
  | 'secondary'
  | 'secondary-destructive'
  | 'accent'
  | 'flat'
  | 'outline'
  | 'icon'
  | 'whiteblock'
  | 'whiteblock-active';

type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';

type ButtonType = 'button' | 'submit' | 'reset';

type ShapeType = 'square' | 'rounded' | null;

export { AppearanceType, SizeType, ButtonType, ShapeType };
