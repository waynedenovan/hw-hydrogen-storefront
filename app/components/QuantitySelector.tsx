interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max,
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="quantity-btn"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        type="button"
        className="quantity-btn"
        onClick={() => onChange(max ? Math.min(max, quantity + 1) : quantity + 1)}
        disabled={max !== undefined && quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
