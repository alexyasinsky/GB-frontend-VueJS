

import {mount} from '@vue/test-utils';
import TestComp from '../../src/components/testComp.vue';

describe('Test Component',()=>{
  test('Test Content with text',()=>{
    const wrapper = mount(TestComp, {
      propsData: {
        message: "Hello from test" 
      }
    });
    expect(wrapper.text()).toEqual('The message is: Hello from test');
  });
})