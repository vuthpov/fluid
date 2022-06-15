import Link from './';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('a', () => {
  it('renders correctly', () => {
    const testId = 'button-test';

    const { container } = render(<Link data-testid={testId} />);
    expect(container.firstChild).toHaveStyle({ background: 'crimson' });
  });
});
