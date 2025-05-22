import { test, expect } from '@playwright/test';

test('POST api/v1/purchases', async ({ request }) => {
  const response = await request.post('api/v1/purchases/attach', {
    data: {
      userId: 'user-123',
      purchaseId: '67890',
      itemType: 'ticket',
      amount: 100,
    },
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toBeDefined();
  expect(responseBody.userId).toBe('user-123');
  expect(responseBody.purchaseId).toBe('67890');
  expect(responseBody.benefitsApplied).toBe(true);

});
