import {UserStore, LinksStore} from 'stores';

export interface IStores {
  userStore: UserStore;
  linksStore: LinksStore;
}

export interface FooterProps {
  className?: string;
}

export interface NavigationProps {
  className?: string;
  navLinks?: navLink[];
}

export interface navLink {
  href: string;
  label: string;
}
