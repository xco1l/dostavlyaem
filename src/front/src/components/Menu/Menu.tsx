import React from 'react';

import {Container, Product} from 'components';
import {useStores} from 'stores';

import './Menu.scss';

export const Menu: React.FC = () => {
  const {menuStore} = useStores(),
    menuSections = menuStore.menuSections;

  return (
    <div className="menu">
      {menuSections &&
        menuSections.map(section => {
          return (
            <div id={section.sectionName} className="menu__section">
              <Container>
                {section.products.map(product => {
                  return <Product product={product} />;
                })}
              </Container>
            </div>
          );
        })}
    </div>
  );
};
