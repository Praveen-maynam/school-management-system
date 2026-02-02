import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input, { InputProps } from './Input';

describe('Input', () => {
  const renderInput = (props?: Partial<InputProps>) =>
    render(<Input label="Test Label" {...props} />);

  it('renders label and input', () => {
    renderInput();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('supports different input types', () => {
    renderInput({ type: 'email' });
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'email');
  });

  it('shows error message and aria attributes', () => {
    renderInput({ error: 'Required' });
    const input = screen.getByLabelText('Test Label');
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('applies fullWidth class', () => {
    renderInput({ fullWidth: true });
    const input = screen.getByLabelText('Test Label');
    expect(input.className).toMatch(/w-full/);
  });

  it('handles change events', () => {
    const onChange = jest.fn();
    renderInput({ onChange });
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('is accessible via keyboard', () => {
    renderInput();
    const input = screen.getByLabelText('Test Label');
    input.focus();
    expect(input).toHaveFocus();
  });
});
