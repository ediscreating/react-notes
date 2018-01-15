import React from 'react';
import { shallow } from 'enzyme';
import Button from 'Button/';
import RemoveButton from './';
import RemoveButtonIcon from './components/RemoveButtonIcon';

describe('RemoveButton', () => {
  test('renders Button', () => {
    expect(shallow(<RemoveButton />).is(Button)).toBeTruthy();
  });

  test('passes RemoveButtonIcon as icon prop to Button', () => {
    const wrapper = shallow(<RemoveButton />);
    expect(wrapper.prop('icon')).toEqual(<RemoveButtonIcon/>);
  });

  test('passes props.iconColor to color prop of RemoveButtonIcon', () => {
    const wrapper = shallow(<RemoveButton iconColor="white" />);
    expect(wrapper.prop('icon').props.color).toBe('white');
  })

  test('passes remaining props to Button', () => {
    const props = {
      label: 'label',
      labelPosition: 'right'
    };
    const wrapper = shallow(<RemoveButton {...props} />);

    expect(wrapper.prop('label')).toBe(props.label);
    expect(wrapper.prop('labelPosition')).toBe(props.labelPosition);
  });
});
