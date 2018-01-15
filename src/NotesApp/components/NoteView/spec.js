import React from 'react';
import { shallow, mount } from 'enzyme';
import NoteView from './';

describe('NoteView', () => {
  test('renders textarea', () => {
    expect(shallow(<NoteView/>).find('textarea').length).toBe(1);
  });

  test('passes props.noteValue to textarea value', () => {
    const textarea = shallow(<NoteView noteValue="val" />).find('textarea');
    expect(textarea.prop('value')).toBe('val');
  });

  test('calls props.onNoteChange with value on textarea change', () => {
    const fn = jest.fn();
    const textarea = shallow(<NoteView onNoteChange={fn} />).find('textarea');

    textarea.simulate('change', { target: { value: 'val' }});

    expect(fn.mock.calls).toHaveLength(1);
    expect(fn.mock.calls[0][0]).toBe('val');
  });
});
