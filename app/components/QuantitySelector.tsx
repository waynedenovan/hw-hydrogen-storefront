interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  /** Step size for each +/- click — e.g. a product's minimum order quantity (MOQ). */
  step?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max,
  step = 1,
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-btn"
        onClick={() => onChange(Math.max(min, quantity - step))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        type="button"
        className="quantity-btn"
        onClick={() => onChange(max ? Math.min(max, quantity + step) : quantity + step)}
        disabled={max !== undefined && quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
