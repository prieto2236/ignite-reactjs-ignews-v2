import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

describe('Async component', () => {
    it('renders correctly', async () => {
        render(<Async />)

        expect(screen.getByText('Olar mundão')).toBeInTheDocument()

        await waitFor(() => {
            return expect(screen.getByText('Button')).toBeInTheDocument()
        }, {
            timeout: 5000,
            interval: 1000
        })

        await waitForElementToBeRemoved(screen.queryByText('Button'))
    })
})