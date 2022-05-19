

import {mount, shallowMount, createLocalVue } from '@vue/test-utils';
import DataForm from '../../src/components/DataForm.vue';
import Vuex from 'vuex'
import { expect } from "@jest/globals";
import category from '@/store/modules/category';
import VueRouter from 'vue-router';


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
          getters: {
            getCategoryList: () => ['Food', 'Transport']   
          },
          mutations: category.mutations,
          actions: category.actions
        }
      }
    });
  });

  test('Test change of action in case props exist',()=>{
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

  test('Test change of action in case props exist',()=>{
    const wrapper = shallowMount(DataForm, {
      store, localVue,
    });
    const categorySelect = wrapper.find('select[name=categories]');
    expect(categorySelect.html()).toContain(`<option>Food</option>`);
    expect(categorySelect.html()).toContain(`<option>Transport</option>`);
  });

})