import {UserStore} from 'stores';

export interface homeInjectedProps {
  userStore: UserStore;
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
