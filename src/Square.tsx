import { SquareValue } from './GameState';

interface SquareProps {
  value: SquareValue;
  trigger: () => void;
  disabled: boolean;
}

export const Square = ({ value, trigger, disabled }: SquareProps) => (
  <button
    style={{
      color: 'white',
      fontSize: '2em',
      overflow: 'hidden',
      minWidth: 0,
      minHeight: 0,
    }}
    onClick={trigger}
    disabled={disabled}
  >
    {value}
  </button>
);
