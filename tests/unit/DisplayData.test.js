import {mount} from '@vue/test-utils';
import DisplayData from "@/components/DisplayData";


describe('DisplayData Component',()=>{
  test('Test snapshot',()=>{
    const wrapper = mount(DisplayData);
    expect(wrapper).toMatchSnapshot();
  });
})