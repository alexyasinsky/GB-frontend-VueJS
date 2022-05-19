

import {mount, shallowMount, createLocalVue } from '@vue/test-utils';
import DataForm from '../../src/components/DataForm.vue';
import Vuex from 'vuex'
import { expect } from "@jest/globals";
import category from '@/store/modules/category';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DataForm Component',()=>{

  let store;
  beforeEach(() => {
    
    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          state: category.state,
          getters: category.getters,
          mutations: category.mutations,
          actions: category.actions
        }
      }
    });
  });
  test('Test Content with text',()=>{
    const wrapper = shallowMount(DataForm, {
      store, localVue,
      propsData: {
        item: {
          date: '19.05.2022',
          category: 'Sport',
          value: 500,
        } 
      }
    });
    expect(wrapper.vm.action).toBe('edit');
  });
})