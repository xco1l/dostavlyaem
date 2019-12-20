import {MobXProviderContext} from 'mobx-react';
import React from 'react';

import {default as LinksStore} from './Links';
import {default as UserStore} from './User';
import {default as MenuStore} from './Menu';

export interface IStores {
  userStore: UserStore;
  linksStore: LinksStore;
  menuStore: MenuStore;
}

export const initialStores = {
  linksStore: new LinksStore(),
  userStore: new UserStore(),
  menuStore: new MenuStore(),
};

export const useStores = (): IStores => {
  return React.useContext(MobXProviderContext);
};

export {LinksStore, UserStore};
