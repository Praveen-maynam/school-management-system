import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox, { CheckboxProps } from './Checkbox';

describe('Checkbox', () => {
  it('renders label', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Checkbox error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('supports controlled checked state', () => {
    function Wrapper() {
      const [checked, setChecked] = React.useState(false);
      return <Checkbox checked={checked} onChange={() => setChecked(v => !v)} label="Check me" />;
    }
    render(<Wrapper />);
    const box = screen.getByRole('checkbox');
    expect(box).not.toBeChecked();
    fireEvent.click(box);
    expect(box).toBeChecked();
  });
});
