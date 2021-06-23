import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from './Button';

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('Renders', async () => {
  // Fails with both legacy / modern
  jest.useFakeTimers();

  render(<Button />)

  // Looking for a role that doesn't exist with a long timeout
  // This should wait for 10 seconds but fails instantly with fake timers
  const button = await screen.findByRole('dialog', {}, { timeout: 10000 });

  expect(button).toBeInTheDocument();
});