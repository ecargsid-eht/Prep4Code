import React from 'react';
import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Registerpage from '../src/pages/register/Registerpage';
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

describe('Registerpage', () => {
    it('renders register form', () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ setUserData: vi.fn() }}>
                    <Registerpage />
                </UserContext.Provider>
            </BrowserRouter>
        );
        // Adjust these as per your actual rendered text
        // expect(screen.getByText("Let's get you in!")).toBeInTheDocument();
        // expect(screen.getByText('REGISTER')).toBeInTheDocument();
    });
});