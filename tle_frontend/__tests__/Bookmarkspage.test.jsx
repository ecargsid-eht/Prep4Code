import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Bookmarkspage from '../src/pages/bookmarks/Bookmarkspage';
import UserContext from '../src/ctx/userContext';

vi.mock('../src/assets/link.svg?react', () => ({
    default: () => <svg data-testid="mock-svg" />,
}));

const mockHandleBookmarks = vi.fn();
const mockUserData = {
    bookmarks: ['1'],
};
const mockContestData = [
    { _id: '1', title: 'Contest 1', platform: 'LeetCode', url: '/c1', startTime: Date.now(), solutionLink: null },
    { _id: '2', title: 'Contest 2', platform: 'Codeforces', url: '/c2', startTime: Date.now(), solutionLink: 'http://youtube.com/abc' },
];

const mockDateFormat = () => '2024-01-01';
const mockTimeFormat = () => '12:00';

describe('Bookmarkspage', () => {
    it('renders bookmarked contests', () => {
        render(
            <UserContext.Provider value={{
                userData: mockUserData,
                contestData: mockContestData,
                dateFormat: mockDateFormat,
                timeFormat: mockTimeFormat,
                handleBookmarks: mockHandleBookmarks,
            }}>
                <Bookmarkspage />
            </UserContext.Provider>
        );
        expect(screen.getByText('Contest 1')).toBeInTheDocument();
        expect(screen.queryByText('Contest 2')).not.toBeInTheDocument();
    });

    it('calls handleBookmarks when button is clicked', () => {
        render(
            <UserContext.Provider value={{
                userData: mockUserData,
                contestData: mockContestData,
                dateFormat: mockDateFormat,
                timeFormat: mockTimeFormat,
                handleBookmarks: mockHandleBookmarks,
            }}>
                <Bookmarkspage />
            </UserContext.Provider>
        );
        fireEvent.click(screen.getByText('Bookmarked'));
        expect(mockHandleBookmarks).toHaveBeenCalledWith('1');
    });
});