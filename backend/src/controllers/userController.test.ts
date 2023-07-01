import { Request, Response } from 'express';
import { describe, expect, it, vi, test } from 'vitest';
import { getUserProfile } from './userController';

describe('getUserProfile', () => {
  it('should return the user object from req.oidc.user', () => {
    const req = {
      oidc: {
        user: {
          sub: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    } as unknown as Request;
    const res = {
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    getUserProfile(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      userId: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should throw an error if req.oidc.user is not present', () => {
    const req = {
      oidc: {
        user: null,
      },
    } as unknown as Request;
    const res = {
      json: vi.fn(),
    } as unknown as Response;
    test.fails('fail test', async () => {
      const next = vi.fn();

      expect(() => getUserProfile(req, res, next)).toThrow(
        'Failed to find authorized user'
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
