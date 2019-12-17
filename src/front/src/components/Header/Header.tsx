import React from 'react';

import './Header.scss';
import {Container} from 'components';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__items">
          <div className="header__item header__item_info">
            <div className="header__item_logo">Dostavlyaem</div>
            <div className="header__item_contacts"></div>
          </div>
          <div className="header__item header__item_profile">
            {!(window as any).user ? (
              <div className="header__auth">
                <button className="sign-in">Войти</button>|
                <button className="sign-up">Зарегистрироваться</button>
              </div>
            ) : (
              <div className="header__user">...</div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
