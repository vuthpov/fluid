import Button from './';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  it('renders correctly', () => {
    const testId = 'button-test';

    const { container } = render(<Button data-testid={testId} />);
    expect(container.firstChild).toHaveStyle({ background: 'crimson' });
  });
});
