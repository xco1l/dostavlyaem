import React, {useEffect} from 'react';

import {Header, Footer, Menu} from 'components';
import {Navigation} from 'containers';
import {useStores} from 'stores';

import './Home.scss';

const Home: React.FC = props => {
  const {userStore} = useStores();

  useEffect(() => {
    userStore.getUser();
  });

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header />
        <Navigation />
        <div className="page__content">
          <Menu />
        </div>
      </div>
      <Footer className="page__footer" />
    </div>
  );
};

export default Home;
