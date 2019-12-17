import React, {useState, useEffect} from 'react';
import {Navigation as NavigationComponent} from 'components';
import {NavigationProps} from 'components/Navigation/Navigation';

const Navigation: React.SFC<NavigationProps> = ({className}) => {
  const [navLinkFromDB, setNavLinks] = useState([]);

  async function getLinks() {
    const links = await fetch('myDB.com/api');
    setNavLinks(links as any);
  }
  useEffect(() => {
    getLinks();
  });
  return <NavigationComponent className={className} navLinks={navLinkFromDB} />;
};

export default Navigation;
