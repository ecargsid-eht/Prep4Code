import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as contestController from './contestController.js';
import Contest from '../models/ContestModel.js';

vi.mock('../models/ContestModel.js');

describe('contestController', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getContests returns all contests', async () => {
        const req = { query: {} };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const contests = [{ title: 'Contest 1' }, { title: 'Contest 2' }];
        Contest.find.mockResolvedValue(contests);

        await contestController.getContests(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(contests);
    });

    it('getContests filters by platforms', async () => {
        const req = { query: { platforms: 'LeetCode,Codeforces' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const contests = [{ title: 'Contest 1', platform: 'LeetCode' }];
        Contest.find.mockResolvedValue(contests);

        await contestController.getContests(req, res);

        expect(Contest.find).toHaveBeenCalledWith({ platform: { $in: ['LeetCode', 'Codeforces'] } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(contests);
    });

    it('createContest creates a contest', async () => {
        const req = { body: { title: 'New Contest' } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const contest = { title: 'New Contest' };
        Contest.create.mockResolvedValue(contest);

        await contestController.createContest(req, res);

        expect(Contest.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(contest);
    });
});