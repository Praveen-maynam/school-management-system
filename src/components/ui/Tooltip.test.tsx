import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Info tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Info tooltip');
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    render(
      <Tooltip content="Focus tooltip">
        <button>Focus me</button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByText('Focus me'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Focus tooltip');
    fireEvent.blur(screen.getByText('Focus me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders in different positions', async () => {
    render(
      <Tooltip content="Bottom tooltip" position="bottom">
        <button>Bottom</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Bottom'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Bottom tooltip');
  });
});
