import React from 'react';
import {Navigation as NavigationComponent} from 'components';
import {NavigationProps} from 'components/Navigation/Navigation';
import {observer, inject} from 'mobx-react';
const Navigation: React.SFC<NavigationProps> = ({className, navLinks}) => {
  return <NavigationComponent className={className} navLinks={navLinks} />;
};

export default inject('navLinks')(observer(Navigation));
