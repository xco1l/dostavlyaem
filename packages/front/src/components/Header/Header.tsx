import React from 'react';
import {observer} from 'mobx-react';

import {Container, Avatar} from 'components';
import {useStores} from 'stores';

import './Header.scss';

export const Header: React.FC = observer(() => {
  const {userStore} = useStores();

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
              <div className="header__user">
                <div className="header__avatar-wrap">
                  <Avatar />
                </div>
                <div className="header__userName">
                  <div className="header__userName-inner">
                    {userStore.User.userName}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
});
