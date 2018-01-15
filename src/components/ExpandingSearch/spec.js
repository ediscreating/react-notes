import React from 'react';
import { shallow, mount } from 'enzyme';
import ExpandingSearch from './';
import ExpandingSearchIcon from './components/ExpandingSearchIcon/'
import ExpandingSearchBtn from './components/ExpandingSearchBtn/';

describe('<ExpandingSearch/>', () => {
  function search(useShallow = true, props) {
    const callback = jest.fn();
    const component = <ExpandingSearch onChange={callback} value="default" {...props} />
    const wrapper = useShallow ? shallow(component) : mount(component);

    return {
      wrapper,
      callback
    };
  }

  test('renders <ExpandingSearchBtn /> component', () => {
    expect(search().wrapper.childAt(0).is(ExpandingSearchBtn)).toBeTruthy();
  });

  test('renders input of type search after Button', () => {
    const input = search().wrapper.childAt(1);
    expect(input.type()).toBe('input');
    expect(input.prop('type')).toBe('search');
  });

  test('passes props to ExpandingSearchBtn', () => {
    const btn = search().wrapper.find(ExpandingSearchBtn);

    expect(btn.prop('color')).toBeUndefined();
    expect(typeof btn.prop('onPress')).toBe('function');
  });

  describe('on button press', () => {
    let wrapper = null;
    let btn = null;

    beforeEach(() => {
      wrapper = search(false).wrapper;
      btn = wrapper.find(ExpandingSearchBtn);
    });

    test('toggles button\'s color prop', () => {
      btn.simulate('click');
      expect(wrapper.find(ExpandingSearchBtn).prop('color')).toBe('mint');
      btn.simulate('click');
      expect(wrapper.find(ExpandingSearchBtn).prop('color')).toBeUndefined();
    });

    test('toggles expanded modifier on input', () => {
      const input = wrapper.find('input');

      btn.simulate('click');
      expect(input.instance().className).toBe('expanding-search__input expanding-search__input_expanded');
      btn.simulate('click');
      expect(input.instance().className).toBe('expanding-search__input');
    });
  });

  test('sets props.zIndex to button\'s z-index', () => {
    const wrapper = search(true, { zIndex: 2 }).wrapper;
    expect(wrapper.prop('style').zIndex).toBe(2);
  });

  test('calls props.onChange with value on input change', () => {
    const { wrapper, callback } = search();

    wrapper.find('input').simulate('change', { target: { value: 'change'} });
    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe('change');
  });

  test('sets props.value to input value', () => {
    const wrapper = search().wrapper;
    expect(wrapper.find('input').prop('value')).toBe('default');
  });
});
