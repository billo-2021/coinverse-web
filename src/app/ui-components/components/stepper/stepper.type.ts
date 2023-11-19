export type StepType = {
  readonly title: string;
  readonly state: 'error' | 'normal' | 'pass';
  readonly isDisabled: boolean;
};
