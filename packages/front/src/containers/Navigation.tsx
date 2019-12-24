import React, {useEffect} from 'react';

import {Navigation as NavigationComponent} from 'components';
import {useStores} from 'stores';
import {NavigationProps} from 'components';
import {observer} from 'mobx-react';

export const Navigation: React.SFC<NavigationProps> = observer(
  ({className}) => {
    const {linksStore} = useStores();

    useEffect(() => {
      if (!linksStore.links.length) linksStore.getLinks();
    });

    return (
      <NavigationComponent className={className} navLinks={linksStore.links} />
    );
  },
);
