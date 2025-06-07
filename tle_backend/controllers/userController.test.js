import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from './userController.js';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('../models/UserModel.js');
vi.mock('bcrypt');
vi.mock('jsonwebtoken');

describe('userController', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getUser returns user if found', async () => {
        const req = { user: { user: { _id: '123' } } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), sendStatus: vi.fn() };
        const user = { _id: '123', username: 'test' };
        User.findById.mockResolvedValue(user);

        await userController.getUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ user });
    });

    it('getUser returns 404 if not found', async () => {
        const req = { user: { user: { _id: '123' } } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), sendStatus: vi.fn() };
        User.findById.mockResolvedValue(null);

        await userController.getUser(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('handleRegister registers a new user', async () => {
        const req = { body: { name: 'Test', username: 'test', password: 'pass' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), cookie: vi.fn() };
        User.findOne.mockResolvedValue(null);
        bcrypt.hash.mockImplementation((pw, salt, cb) => cb(null, 'hashed'));
        User.create.mockResolvedValue({ _id: '1', username: 'test' });
        jwt.sign.mockReturnValue('token');

        await userController.handleRegister(req, res);

        expect(res.cookie).toHaveBeenCalledWith('token', 'token');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    it('handleLogin logs in user with correct credentials', async () => {
        const req = { body: { username: 'test', password: 'pass' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), cookie: vi.fn() };
        const next = vi.fn();
        const user = { _id: '1', username: 'test', password: 'hashed' };
        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockImplementation((pw, hash, cb) => cb(null, true));
        jwt.sign.mockReturnValue('token');

        await userController.handleLogin(req, res, next);

        expect(res.cookie).toHaveBeenCalledWith('token', 'token');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    it('handleBookmark bookmarks and unbookmarks a contest', async () => {
        const req = { params: { id: 'c1' }, user: { user: { _id: 'u1' } } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const user = {
            bookmarks: [],
            save: vi.fn(),
        };
        User.findById.mockResolvedValue(user);

        // Bookmark
        await userController.handleBookmark(req, res);
        expect(user.bookmarks).toContainEqual({ _id: 'c1' });
        expect(res.status).toHaveBeenCalledWith(201);

        // Unbookmark
        user.bookmarks = [{ _id: 'c1' }];
        await userController.handleBookmark(req, res);
        expect(user.bookmarks).toEqual([]);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});