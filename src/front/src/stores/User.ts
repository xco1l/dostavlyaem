import {observable, action} from 'mobx';

import {axios} from 'core';
import {User} from '@/models';

class UserStore {
  @observable User: User = {} as any;

  @action async getUser() {
    try {
      const response = await axios.get('/users/me');
      this.User = response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserStore;
