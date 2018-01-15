import React from 'react';
import { shallow } from 'enzyme';
import { List, ListItem } from './';

describe('List', () => {
  const children = [
    <ListItem title="ItemOne" key={0} />,
    <ListItem title="ItemTwo" key={1} />,
    <ListItem title="ItemThree" key={2} />
  ];

  function list(props) {
    return shallow(
      <List {...props}>
        {children}
      </List>
    );
  }

  test('renders ul as root', () => {
    expect(list().first().is('ul')).toBeTruthy();
  });

  test('renders children', () => {
    const wrapper = list().find('ul').children();

    expect(wrapper).toHaveLength(children.length);

    for (let i = 0; i < children.length; i++) {
      expect(wrapper.at(i).equals(children[i])).toBeTruthy();
    }
  });

  test('adds props.mixClass to className', () => {
    expect(list({ mixClass: 'mix' }).hasClass('mix')).toBeTruthy();
  })
});
