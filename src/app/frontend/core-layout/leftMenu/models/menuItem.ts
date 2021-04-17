export interface MenuItem {
  title: string;
  icon: string;
  routerLink: string[],
  expanded: boolean,
  children: MenuItem[]
}
