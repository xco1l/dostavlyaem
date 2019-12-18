import React, {useEffect} from 'react';
import {observer, inject} from 'mobx-react';

import {NavigationProps, linksStoreInjected} from 'types';
import {Navigation as NavigationComponent} from 'components';

const Navigation: React.SFC<NavigationProps> = props => {
  const className = props.className;
  const linksStore = (props as linksStoreInjected).linksStore;
  useEffect(() => {
    if (!linksStore.links.length) linksStore.getLinks();
  });

  return (
    <NavigationComponent className={className} navLinks={linksStore.links} />
  );
};

export default inject('linksStore')(observer(Navigation));
