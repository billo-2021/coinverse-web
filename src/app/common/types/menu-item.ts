export type MenuItem = {
  readonly link: string;
  readonly text: string;
  readonly icon: string;
  readonly roles: ('admin' | 'customer') []
};
