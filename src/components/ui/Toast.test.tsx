import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast, { ToastProps } from './Toast';

describe('Toast', () => {
  const baseProps: ToastProps = {
    message: 'Test message',
    onClose: jest.fn(),
  };

  it('renders message', () => {
    render(<Toast {...baseProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies type styles', () => {
    render(<Toast {...baseProps} type="success" />);
    expect(screen.getByRole('status').className).toMatch(/green/);
  });

  it('calls onClose after duration', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(<Toast {...baseProps} onClose={onClose} duration={1000} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<Toast {...baseProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close notification/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onAction when action button clicked', () => {
    const onAction = jest.fn();
    render(
      <Toast {...baseProps} actionLabel="Undo" onAction={onAction} />
    );
    fireEvent.click(screen.getByText('Undo'));
    expect(onAction).toHaveBeenCalled();
  });
});
