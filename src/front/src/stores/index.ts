import {MobXProviderContext} from 'mobx-react';
import React from 'react';

import {default as LinksStore} from './Links';
import {default as UserStore} from './User';
import {IStores} from 'types';

export const initialStores = {
  linksStore: new LinksStore(),
  userStore: new UserStore(),
};

export const useStores = (): IStores => {
  return React.useContext(MobXProviderContext);
};

export {LinksStore, UserStore};
