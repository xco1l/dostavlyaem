import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';

import {Header, Footer, Container} from 'components';
import {Navigation} from 'containers';
import './Home.scss';
import {userStoreInjected} from 'types';

const Home: React.FC = props => {
  const userStore = (props as userStoreInjected).userStore;

  useEffect(() => {
    userStore.getUser();
  });

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header />
        <Navigation />
        <div className="page__content">
          <Container>MENU</Container>
        </div>
      </div>
      <Footer className="page__footer" />
    </div>
  );
};

export default inject('userStore')(observer(Home));
