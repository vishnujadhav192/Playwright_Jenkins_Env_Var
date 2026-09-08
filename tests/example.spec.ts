import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load variables from .env file
dotenv.config();

test('Greetings', async () => {
  const userName = process.env.USER_NAME;
  const userMessage = process.env.USER_MESSAGE;

  console.log(`Hello ${userName} !!!! ${userMessage}`);

  expect(userName).toBe("Vishnu");
  expect(userMessage).toBe("Welcome to team");
});