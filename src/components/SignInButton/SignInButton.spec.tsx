import { render, screen, fireEvent } from '@testing-library/react'
import { SignInButton } from '.'
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'

jest.mock('next-auth/react')

describe('SignInButton component', () => {
    it('renders correctly when not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SignInButton />)

        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('redirects to post when user already has a subscription', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValue({
            data: {
                expires: "1",
                user: {
                    name: 'André Prieto',
                    email: 'prieto2236@gmail.com'
                },
                activeSubscription: 'active'
            },
            status: "authenticated"
        })

        render(<SignInButton />)

        expect(screen.getByText('André Prieto')).toBeInTheDocument()
    })
})