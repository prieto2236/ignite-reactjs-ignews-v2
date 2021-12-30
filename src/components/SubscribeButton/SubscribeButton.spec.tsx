import { render, screen, fireEvent } from '@testing-library/react'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'

jest.mock('next/router')

jest.mock('next-auth/react')

describe('SubscribeButton component', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SubscribeButton />)

        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to post when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMocked = jest.fn()

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

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(pushMocked).toHaveBeenCalled()
    })
})