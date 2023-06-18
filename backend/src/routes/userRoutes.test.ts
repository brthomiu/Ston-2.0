/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import express from 'express';
import { describe, expect, it } from 'vitest';
import userRoutes from './userRoutes';

const app = express();
app.use('/', userRoutes);

describe('Authentication Routes', () => {
  it('should respond with user profile when user is authenticated', async () => {
    // Simulate an authenticated user
    const agent = request.agent(app);

    // Perform login
    await agent.get('/login');

    // Make a GET request to the profile route
    const response = await agent.get('/profile');

    // Assert that the response contains the user profile
    expect(response.body).toEqual({
      /* Expected user profile object */
    });
  });

  it('should respond with "Logged out" if user is not authenticated', async () => {
    // Make a GET request to the root route
    const response = await request(app).get('/');

    // Assert that the response is "Logged out"
    expect(response.text).toBe('Logged out');
  });
});
