import { test, expect, APIRequestContext, request } from '@playwright/test';

const BASE_URL = 'https://demoqa.com';
const credentials = {
  userName: 'successstha',
  password: 'Success@123',
};

// Login helper function to get token and userId
async function login(context: APIRequestContext) {
  const loginResponse = await context.post(`${BASE_URL}/Account/v1/Login`, {
    data: credentials,
  });
  expect(loginResponse.ok()).toBeTruthy();
  const body = await loginResponse.json();
  return {
    token: body.token,
    userId: body.userId,
  };
}

test.describe('Books API tests', () => {
  let context: APIRequestContext;
  let token: string;
  let userId: string;

  test.beforeAll(async ({ playwright }) => {
    context = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    const loginData = await login(context);
    token = loginData.token;
    userId = loginData.userId;
  });

  test('GET - Fetch all books', async () => {
    const response = await context.get('/BookStore/v1/Books');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.books).toBeDefined();
    expect(Array.isArray(body.books)).toBeTruthy();

    console.log(`Books count: ${body.books.length}`);
  });

  test('POST - Add a book to user', async () => {
    const addBookPayload = {
      userId,
      collectionOfIsbns: [{ isbn: '9781449325862' }], // example ISBN
    };

    const response = await context.post(`/BookStore/v1/Books`, {
      data: addBookPayload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log('Book added:', body);
  });

  test('GET - Get books of user', async () => {
    const response = await context.get(`/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.userId).toBe(userId);
    console.log('User books:', body.books);
  });

  test('DELETE - Remove book from user', async () => {
    const deletePayload = {
      userId,
      isbn: '9781449325862',
    };

    const response = await context.delete('/BookStore/v1/Book', {
      data: deletePayload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(204); // No Content on successful delete
    console.log('Book deleted from user');
  });

  test('POST - Generate token (login)', async () => {
    const response = await context.post('/Account/v1/Login', {
      data: credentials,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(body.userId).toBeTruthy();

    console.log('Login token generated:', body.token);
  });
});
