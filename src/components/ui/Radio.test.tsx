import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio, { RadioProps } from './Radio';

describe('Radio', () => {
  it('renders label', () => {
    render(<Radio label="Option 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Radio error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('supports controlled checked state in group', () => {
    function Wrapper() {
      const [value, setValue] = React.useState('a');
      return (
        <>
          <Radio name="group" value="a" checked={value === 'a'} onChange={() => setValue('a')} label="A" />
          <Radio name="group" value="b" checked={value === 'b'} onChange={() => setValue('b')} label="B" />
        </>
      );
    }
    render(<Wrapper />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
  });
});
