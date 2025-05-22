import { test, expect } from '@playwright/test';

test('POST /api/v1/payments', async ({ request }) => {
  const response = await request.post('api/v1/payments', {
    data: {
      userId: '12345',
      amount: 100,
      description: 'Test payment',
    },
  });
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();
  expect(responseBody.success).toBe(true);
});
