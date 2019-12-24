import {observable, action} from 'mobx';

import {axios} from 'core';

class LinksStore {
  @observable links = [];

  @action async getLinks() {
    try {
      const response = await axios.get('/navlinks');
      this.links = response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default LinksStore;
