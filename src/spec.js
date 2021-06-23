import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from './Button';

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('Renders', async () => {
  jest.useFakeTimers();

  render(<Button />)

  // Looking for a role that doesn't exist with a long timeout
  // This should wait for 5 seconds, works on v11
  const button = await screen.findByRole('dialog', {}, { timeout: 5000 });

  expect(button).toBeInTheDocument();
});