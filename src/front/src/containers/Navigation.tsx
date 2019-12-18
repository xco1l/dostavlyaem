import React, {useEffect} from 'react';
import {observer, inject} from 'mobx-react';

import {NavigationProps} from 'types';
import {Navigation as NavigationComponent} from 'components';
import {LinksStore} from 'stores';

interface navigationInjectedProps extends NavigationProps {
  linksStore: LinksStore;
}

const Navigation: React.SFC<NavigationProps> = props => {
  const className = props.className;
  const linksStore = (props as navigationInjectedProps).linksStore;
  useEffect(() => {
    if (!linksStore.links.length) linksStore.getLinks();
  });

  return (
    <NavigationComponent className={className} navLinks={linksStore.links} />
  );
};

export default inject('linksStore')(observer(Navigation));
