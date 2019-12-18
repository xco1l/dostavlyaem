import React from 'react';

import './Navigation.scss';
import {Container} from 'components';
import {NavigationProps} from 'types';

const Navigation: React.FC<NavigationProps> = ({className, navLinks = []}) => {
  return (
    <div className={(className || '') + ' navigation'}>
      <Container>
        <div className="navigation__content">
          <ul className="navigation__list">
            {navLinks.length
              ? navLinks.map(link => {
                  return (
                    <li className="navigation__link" key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  );
                })
              : null}
          </ul>
          <div className="navigation__cart"></div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
