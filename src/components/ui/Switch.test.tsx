import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch, { SwitchProps } from './Switch';

describe('Switch', () => {
  it('renders label', () => {
    render(<Switch label="Enable" />);
    expect(screen.getByText('Enable')).toBeInTheDocument();
  });

  it('calls onChange when toggled', () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports controlled checked state', () => {
    function Wrapper() {
      const [checked, setChecked] = React.useState(false);
      return <Switch checked={checked} onChange={() => setChecked(v => !v)} label="Switch me" />;
    }
    render(<Wrapper />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
