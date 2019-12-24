import {observable, action} from 'mobx';

import {axios} from 'core';
import {Product} from '@/models';

interface menuSection {
  sectionName: string;
  products: Product[];
}

class MenuStore {
  @observable public menuSections: menuSection[] = [];

  @action async getMenuSections() {
    axios.get('/menu/sections');
  }
}

export default MenuStore;
