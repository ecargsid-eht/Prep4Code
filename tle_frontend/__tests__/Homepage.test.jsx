import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Homepage from '../src/pages/home/Homepage';
import UserContext from '../src/ctx/userContext';

vi.mock('../src/assets/link.svg?react', () => ({
    default: () => <svg data-testid="mock-svg" />,
}));

const mockHandleBookmarks = vi.fn();
const mockUserData = { bookmarks: ['1'] };
const now = new Date();
const mockContestData = [
    { _id: '1', title: 'Upcoming Contest', platform: 'LeetCode', url: '/c1', startTime: new Date(now.getTime() + 1000000).toISOString(), solutionLink: null },
    { _id: '2', title: 'Past Contest', platform: 'Codeforces', url: '/c2', startTime: new Date(now.getTime() - 1000000).toISOString(), solutionLink: 'http://youtube.com/abc' },
];
const mockDateFormat = () => '2024-01-01';
const mockTimeFormat = () => '12:00';

describe('Homepage', () => {
    it('renders contests', () => {
        render(
            <UserContext.Provider value={{
                userData: mockUserData,
                contestData: mockContestData,
                dateFormat: mockDateFormat,
                timeFormat: mockTimeFormat,
                handleBookmarks: mockHandleBookmarks,
            }}>
                <Homepage />
            </UserContext.Provider>
        );
        expect(screen.getByText('Upcoming Contest')).toBeInTheDocument();
        expect(screen.getByText('Past Contest')).toBeInTheDocument();
    });
});