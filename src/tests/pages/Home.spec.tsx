import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'
import { mocked } from 'jest-mock'

jest.mock('next/router')
jest.mock('next-auth/react', () => {
    return {
        useSession: () => {
            return { data: null }
        }
    }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Home product={{ priceId: 'fake', amount: '$9.90' }} />)

        expect(screen.getByText('for $9.90 month')).toBeInTheDocument()
    })

    it('loads initial data correctly', async () => {
        const retrieveStripeMocked = mocked(stripe.prices.retrieve)

        retrieveStripeMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: 'fake-price-id',
                        amount: '$10.00'
                    }
                }
            })
        )
    })
})