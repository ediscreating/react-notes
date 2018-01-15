import React from 'react';
import { shallow } from 'enzyme';
import AddButton from './';
import AddButtonIcon from './components/AddButtonIcon/';
import Button from 'Button/';

describe('AddButton', () => {
  function btn(props) {
    return shallow(<AddButton {...props}/>);
  }

  test('renders Button as root', () => {
    expect(btn().is(Button)).toBeTruthy();
  });

  test('passes AddButtonIcon as icon prop to Button', () => {
    expect(btn({ icon: <svg></svg> }).prop('icon')).toEqual(<AddButtonIcon/>);
  });

  test('passes other props to Button', () => {
    const props = {
      label: 'Add',
      labelPosition: 'right',
      mixClass: 'mix-class'
    };

    const wrapper = btn(props);
    expect(wrapper.prop('label')).toEqual(props.label);
    expect(wrapper.prop('labelPosition')).toEqual(props.labelPosition);
    expect(wrapper.prop('mixClass')).toEqual(props.mixClass);
  });

  test('passes props.iconColor to AddButtonIcon color prop', () => {
    const icon = btn({ iconColor: 'mint' }).prop('icon');
    expect(icon.props.color).toEqual('mint');
  });
});
