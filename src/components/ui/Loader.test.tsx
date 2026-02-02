import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader, { LoaderProps } from './Loader';

describe('Loader', () => {
  it('renders with default size and color', () => {
    render(<Loader />);
    const svg = screen.getByTestId('loader-svg');
    expect(svg).toBeInTheDocument();
    // Handle SVGAnimatedString in jsdom
    const className = ((svg as unknown) as SVGElement)?.className?.baseVal || ((svg as unknown) as SVGElement)?.className || '';
    expect(className).toMatch(/h-6/);
    expect(className).toMatch(/text-blue-600/);
  });

  it('renders with custom size and color', () => {
    render(<Loader size="lg" color="text-red-500" />);
    const svg = screen.getByTestId('loader-svg'); 
    const className = ((svg as unknown) as SVGElement)?.className?.baseVal || ((svg as unknown) as SVGElement)?.className || '';
    expect(className).toMatch(/h-10/);
    expect(className).toMatch(/text-red-500/);
  });

  it('renders label for accessibility', () => {
    render(<Loader label="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
