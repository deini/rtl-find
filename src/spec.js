import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { Button } from './Button';

const server = setupServer(
  rest.get('/api/notifications', (_req, res, ctx) =>
    res(ctx.json({ notifications: ['Foo'] }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('renders number of notifications', async () => {
  jest.useFakeTimers();

  // Override the endpoint only for one call
  server.use(
    rest.get('/api/notifications', (_req, res, ctx) =>
      res.once(ctx.json({ notifications: ['Foo', 'Bar'] }))
    )
  );

  render(<Button />);

  // Initializes with 0 from useState([])
  await screen.findByRole('button', { name: /Notifications: 0/i });

  // Override endpoint (once) returns two notifications
  act(() => jest.advanceTimersByTime(200));
  await screen.findByRole('button', { name: /Notifications: 2/i });

  // Default endpoint return one notification
  act(() => jest.advanceTimersByTime(200));
  await screen.findByRole('button', { name: /Notifications: 1/i });
});

// Note: This will still give us act warnings because we have a fetch inside
// the interval, we could probably do an await act(() => await screen.find... )
