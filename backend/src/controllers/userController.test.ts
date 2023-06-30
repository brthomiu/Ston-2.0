// import { Request, Response } from 'express';
// import { describe, expect, it, vi, test } from 'vitest';
// import {
//   getUser /* syncUser, deleteUser, IUserData */,
// } from './userController';

// describe('getUser', () => {
//   it('should return the user object from req.oidc.user', () => {
//     const req = {
//       oidc: {
//         user: {
//           sub: 'user123',
//           name: 'John Doe',
//           email: 'john@example.com',
//         },
//       },
//     } as unknown as Request;
//     const res = {
//       json: vi.fn(),
//     } as unknown as Response;

//     getUser(req, res);

//     expect(res.json).toHaveBeenCalledWith({
//       userId: 'user123',
//       name: 'John Doe',
//       email: 'john@example.com',
//     });
//   });

//   it('should throw an error if req.oidc.user is not present', () => {
//     const req = {
//       oidc: {
//         user: null,
//       },
//     } as unknown as Request;
//     const res = {
//       json: vi.fn(),
//     } as unknown as Response;
//     test.fails('fail test', async () => {
//       expect(() => getUser(req, res)).toThrow('Failed to find authorized user');
//       expect(res.json).not.toHaveBeenCalled();
//     });
//   });
// });

// // describe('syncUser', () => {
// //   it('should create a new user if no match is found in MongoDB', async () => {
// //     const userData: IUserData = {
// //       userId: 'user123',
// //       name: 'John Doe',
// //       email: 'john@example.com',
// //     };
// //     const res = {
// //       status: vi.fn().mockReturnThis(),
// //       json: vi.fn(),
// //     } as unknown as Response;
// //     const db = {
// //       collection: vi.fn().mockReturnThis(),
// //       findOne: vi.fn().mockResolvedValue(null),
// //     };

// //     await syncUser(userData, res);

// //     expect(db.collection).toHaveBeenCalledWith('users');
// //     expect(db.findOne).toHaveBeenCalledWith({ userId: 'user123' });
// //     expect(res.status).toHaveBeenCalledWith(201);
// //     expect(res.json).toHaveBeenCalledWith({
// //       message: 'User synced successfully',
// //     });
// //   });

// //   it('should send a response indicating the user already exists if a match is found in MongoDB', async () => {
// //     const userData: IUserData = {
// //       userId: 'user123',
// //       name: 'John Doe',
// //       email: 'john@example.com',
// //     };
// //     const res = {
// //       status: vi.fn().mockReturnThis(),
// //       json: vi.fn(),
// //     } as unknown as Response;
// //     const db = {
// //       collection: vi.fn().mockReturnThis(),
// //       findOne: vi.fn().mockResolvedValue({ userId: 'user123' }),
// //     };

// //     await syncUser(userData, res);

// //     expect(db.collection).toHaveBeenCalledWith('users');
// //     expect(db.findOne).toHaveBeenCalledWith({ userId: 'user123' });
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
// //   });
// // });

// // describe('deleteUser', () => {
// //   it('should delete the user account from MongoDB', async () => {
// //     const userData: IUserData = {
// //       userId: 'user123',
// //       name: 'John Doe',
// //       email: 'john@example.com',
// //     };
// //     const res = {
// //       status: vi.fn().mockReturnThis(),
// //       json: vi.fn(),
// //     } as unknown as Response;
// //     const db = {
// //       collection: vi.fn().mockReturnThis(),
// //       deleteOne: vi.fn().mockResolvedValue({}),
// //     };

// //     await deleteUser(userData, res);

// //     expect(db.collection).toHaveBeenCalledWith('users');
// //     expect(db.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
// //     expect(res.status).toHaveBeenCalledWith(200);
// //     expect(res.json).toHaveBeenCalledWith({
// //       message: 'User deleted successfully',
// //     });
// //   });

// //   it('should handle errors and send a server error response', async () => {
// //     const userData: IUserData = {
// //       userId: 'user123',
// //       name: 'John Doe',
// //       email: 'john@example.com',
// //     };
// //     const res = {
// //       status: vi.fn().mockReturnThis(),
// //       json: vi.fn(),
// //     } as unknown as Response;
// //     const db = {
// //       collection: vi.fn().mockReturnThis(),
// //       deleteOne: vi.fn().mockRejectedValue(new Error('Database error')),
// //     };

// //     await deleteUser(userData, res);

// //     expect(db.collection).toHaveBeenCalledWith('users');
// //     expect(db.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
// //     expect(res.status).toHaveBeenCalledWith(500);
// //     expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
// //   });
// // });
