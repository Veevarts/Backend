import { test, expect } from '@playwright/test';

test('GET /api/v1/screenings', async ({ request }) => {
  const response = await request.get('api/v1/screenings?date=2025-05-15');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();
  expect(Array.isArray(responseBody)).toBe(true);
});

test('GET /api/v1/screenings/:id', async ({ request }) => {
  const response = await request.get('api/v1/screenings/1');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();
  expect(responseBody.id).toBe('1');
});