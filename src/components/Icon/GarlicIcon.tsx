import type { HTMLAttributes } from 'react';

const GarlicIcon = ({ style, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="img"
    aria-label="garlic"
    style={{ fontSize: 24, display: 'inline-block', ...style }}
    {...props}
  >
    🧄
  </span>
);

export default GarlicIcon; 