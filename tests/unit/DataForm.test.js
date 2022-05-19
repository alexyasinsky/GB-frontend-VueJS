

import {mount, shallowMount, createLocalVue } from '@vue/test-utils';
import DataForm from '../../src/components/DataForm.vue';
import Vuex from 'vuex'
import { expect } from "@jest/globals";
import category from '@/store/modules/category';
import modal from '@/plugins/ModalWindow';




describe('DataForm Component',()=>{
  const localVue = createLocalVue();

  localVue.use(Vuex, modal);
  
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          state: { 
            categoryList : ['Food', 'Transport'] 
          },
          getters: {
            getCategoryList: () => ['Food', 'Transport']   
          },
          actions: category.actions,
          mutations: category.mutations
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

  test('Test adding new category', ()=> {
    const addCategory = jest.spyOn(DataForm.methods, 'addCategory');
    const wrapper = mount(DataForm, {
      store, localVue,
    });
    const input = wrapper.find('input[name=newCategory');
    input.setValue('Movies');
    const btn = wrapper.find('button[name=addCategory]');
    btn.trigger('click');
    expect(addCategory).toHaveBeenCalled();
    expect(wrapper.vm.$data.newCategory).toBe('');
  });

  test('Test 4', () => {
    const wrapper = mount(DataForm, {
      store, localVue,
    });
    const btn=wrapper.find('button[name=toggleForm]');
    const form=wrapper.find('form[name=addForm]').isVisible();
    expect(wrapper.vm.$data.isNewCategoryFormShown).toBe(false);
    expect(form).toBe(false);
    btn.trigger('click');
    expect(wrapper.vm.$data.isNewCategoryFormShown).toBe(true);
    expect(form).toBe(true);
  });
})