import React from 'react';
import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Loginpage from '../src/pages/login/Loginpage';
import UserContext from '../src/ctx/userContext';
import { BrowserRouter } from 'react-router';

vi.mock('../src/components/LinkSvg', () => ({
    default: () => <svg data-testid="mock-svg" />,
}));

vi.mock('react-cookie', () => ({
    useCookies: () => [null, vi.fn()],
}));
vi.mock('../../api/axiosInstance', () => ({
    axiosInstance: { post: vi.fn() }
}));
vi.mock('react-toastify', () => ({
    toast: vi.fn()
}));

describe('Loginpage', () => {
    it('renders login form', () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ setUserData: vi.fn() }}>
                    <Loginpage />
                </UserContext.Provider>
            </BrowserRouter>
        );
        // Adjust these as per your actual rendered text
        // expect(screen.getByText("Let's get you in!")).toBeInTheDocument();
        // expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    });
});