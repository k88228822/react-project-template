export interface IMenuItem {
  path: string;
  name: string;
  icon?: string;
  children?: IMenuItem[];
}
