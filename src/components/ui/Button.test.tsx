import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

describe('Button', () => {
  const renderButton = (props?: Partial<ButtonProps>) =>
    render(<Button {...props}>Test</Button>);

  it('renders children', () => {
    renderButton();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    renderButton({ variant: 'danger', size: 'lg' });
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/bg-red-600/);
    expect(btn.className).toMatch(/px-6/);
  });

  it('shows loading spinner and disables button', () => {
    renderButton({ loading: true });
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    // Query the SVG spinner using Testing Library
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    renderButton({ onClick });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies fullWidth class', () => {
    renderButton({ fullWidth: true });
    expect(screen.getByRole('button').className).toMatch(/w-full/);
  });

  it('is accessible via keyboard', () => {
    renderButton();
    const btn = screen.getByRole('button');
    btn.focus();
    expect(btn).toHaveFocus();
  });
});
