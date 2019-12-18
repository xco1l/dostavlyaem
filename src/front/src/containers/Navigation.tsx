import React, {useEffect} from 'react';
import {Navigation as NavigationComponent} from 'components';
import {NavigationProps} from 'components/Navigation/Navigation';
import {observer, inject} from 'mobx-react';

const Navigation: React.SFC<NavigationProps> = ({
  className,
  linksStore,
}: any) => {
  useEffect(() => {
    if (!linksStore.links.length) linksStore.getLinks();
    console.log(linksStore.links);
  });

  return (
    <NavigationComponent className={className} navLinks={linksStore.links} />
  );
};

export default inject('linksStore')(observer(Navigation));
