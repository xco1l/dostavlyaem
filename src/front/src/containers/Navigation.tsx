import React, {useEffect} from 'react';
import {observer, inject} from 'mobx-react';

import {NavigationProps} from 'types';
import {Navigation as NavigationComponent} from 'components';
import {useStores} from 'stores';

const Navigation: React.SFC<NavigationProps> = ({className}) => {
  const {linksStore} = useStores();
  useEffect(() => {
    if (!linksStore.links.length) linksStore.getLinks();
  });

  return (
    <NavigationComponent className={className} navLinks={linksStore.links} />
  );
};

export default inject('linksStore')(observer(Navigation));
