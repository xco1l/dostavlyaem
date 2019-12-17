import React from 'react';

import './Navigation.scss';
import {Container} from 'components';

const Navigation: React.FC<NavigationProps> = ({className, navLinks = []}) => {
  return (
    <div className={(className || '') + ' navigation'}>
      <Container>
        <div className="navigation__content">
          <ul className="navigation__list">
            <li className="navigation__link">NAV LINK</li>
            <li className="navigation__link">NAV LINK</li>
            <li className="navigation__link">NAV LINK</li>
            <li className="navigation__link">NAV LINK</li>
            <li className="navigation__link">NAV LINK</li>
            <li className="navigation__link">NAV LINK</li>
            {
              //TODO
              //Показать ссылки из БД
            }
          </ul>
          <div className="navigation__cart"></div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;

export interface NavigationProps {
  className?: string;
  navLinks?: navLink[];
}

export interface navLink {
  href: string;
  label: string;
}
