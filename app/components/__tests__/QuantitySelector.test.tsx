import {describe, it, expect, vi, afterEach} from 'vitest';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {QuantitySelector} from '../QuantitySelector';

afterEach(cleanup);

describe('QuantitySelector', () => {
  it('renders the current quantity', () => {
    const {getByText} = render(
      <QuantitySelector quantity={3} onChange={() => {}} />,
    );
    expect(getByText('3')).toBeDefined();
  });

  it('calls onChange with decremented value when minus is clicked', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={5} onChange={onChange} />,
    );
    fireEvent.click(getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('calls onChange with incremented value when plus is clicked', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={5} onChange={onChange} />,
    );
    fireEvent.click(getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('disables minus button at min value', () => {
    const {getByLabelText} = render(
      <QuantitySelector quantity={1} onChange={() => {}} min={1} />,
    );
    expect(
      (getByLabelText('Decrease quantity') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('does not fire onChange when at min and minus is clicked', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={3} onChange={onChange} min={3} />,
    );
    fireEvent.click(getByLabelText('Decrease quantity'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables plus button at max value', () => {
    const {getByLabelText} = render(
      <QuantitySelector quantity={10} onChange={() => {}} max={10} />,
    );
    expect(
      (getByLabelText('Increase quantity') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('does not go above max value', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={9} onChange={onChange} max={10} />,
    );
    fireEvent.click(getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('uses default min of 1', () => {
    const {getByLabelText} = render(
      <QuantitySelector quantity={1} onChange={() => {}} />,
    );
    expect(
      (getByLabelText('Decrease quantity') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('allows unlimited increase when max is not set', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={999} onChange={onChange} />,
    );
    const plusButton = getByLabelText(
      'Increase quantity',
    ) as HTMLButtonElement;
    expect(plusButton.disabled).toBe(false);
    fireEvent.click(plusButton);
    expect(onChange).toHaveBeenCalledWith(1000);
  });

  it('increments by step (MOQ) when provided', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={5} onChange={onChange} min={5} step={5} />,
    );
    fireEvent.click(getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('decrements by step (MOQ) but never below min', () => {
    const onChange = vi.fn();
    const {getByLabelText} = render(
      <QuantitySelector quantity={10} onChange={onChange} min={5} step={5} />,
    );
    fireEvent.click(getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('disables minus at the MOQ floor', () => {
    const {getByLabelText} = render(
      <QuantitySelector quantity={5} onChange={() => {}} min={5} step={5} />,
    );
    expect(
      (getByLabelText('Decrease quantity') as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
