import React from 'react';

import './Header.scss';
import {Container} from 'components';
import {inject, observer} from 'mobx-react';
import {userStoreInjected} from 'types';

const Header: React.FC = props => {
  const userStore = (props as userStoreInjected).userStore;

  return (
    <header className="header">
      <Container>
        <div className="header__items">
          <div className="header__item header__item_info">
            <div className="header__item_logo">Dostavlyaem</div>
            <div className="header__item_contacts"></div>
          </div>
          <div className="header__item header__item_profile">
            {!userStore.User ? (
              <div className="header__auth">
                <button className="sign-in">Войти</button>|
                <button className="sign-up">Зарегистрироваться</button>
              </div>
            ) : (
              <div className="header__user">{userStore.User.userName}</div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default inject('userStore')(observer(Header));
