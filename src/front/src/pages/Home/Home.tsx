import React, {useEffect} from 'react';

import {Header, Footer, Container} from 'components';
import {Navigation} from 'containers';
import './Home.scss';
import {UserStore} from 'stores';
import {inject, observer} from 'mobx-react';

interface homeInjectedProps {
  userStore: UserStore;
}

const Home: React.FC = props => {
  const userStore = (props as homeInjectedProps).userStore;

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
