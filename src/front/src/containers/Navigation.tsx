import React from 'react';
import {Navigation as NavigationComponent} from 'components';
import {NavigationProps} from 'components/Navigation/Navigation';
import {observer, inject} from 'mobx-react';
const Navigation: React.SFC<NavigationProps> = ({className, stores}: any) => {
  return (
    <NavigationComponent className={className} navLinks={stores.navLinks} />
  );
};

export default inject('stores')(observer(Navigation));
