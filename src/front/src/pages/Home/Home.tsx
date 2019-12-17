import React from 'react';

import {Header, Footer, Container} from 'components';
import {Navigation} from 'containers';
import './Home.scss';
const Home: React.FC = () => {
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

export default Home;
