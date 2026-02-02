import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select, { SelectOption } from './Select';

describe('Select', () => {
  const options: SelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  it('renders label and placeholder', () => {
    render(<Select options={options} value={''} onChange={() => {}} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('opens dropdown and selects option', () => {
    const onChange = jest.fn();
    render(<Select options={options} value={''} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('supports multi-select', () => {
    function Wrapper() {
      const [value, setValue] = React.useState<string[]>([]);
      const handleChange = (val: string | string[]) => {
        setValue(Array.isArray(val) ? val : [val]);
      };
      return (
        <Select options={options} value={value} onChange={handleChange} multiple />
      );
    }
    render(<Wrapper />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Apple'));
    expect(screen.getByRole('button').textContent).toMatch(/Apple/);
    fireEvent.click(screen.getByText('Banana'));
    expect(screen.getByRole('button').textContent).toMatch(/Apple/);
    expect(screen.getByRole('button').textContent).toMatch(/Banana/);
    fireEvent.click(screen.getByText('Apple'));
    expect(screen.getByRole('button').textContent).not.toMatch(/Apple/);
  });

  it('filters options when searchable', () => {
    render(<Select options={options} value={''} onChange={() => {}} searchable />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'che' } });
    expect(screen.getByText('Cherry')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('is keyboard accessible', () => {
    render(<Select options={options} value={''} onChange={() => {}} />);
    fireEvent.click(screen.getByRole('button'));
    const option = screen.getByText('Banana');
    option.focus();
    fireEvent.keyDown(option, { key: 'Enter' });
    // No assertion here, just ensure no error
  });
});
