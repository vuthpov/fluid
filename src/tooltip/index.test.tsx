import Tooltip from './'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

describe('Tooltip', () => {
  it('should show tooltip on hover', async () => {
    const testId = 'tooltip-test'
    const tooltipContentTestId = 'tooltip-content-test'

    const user = userEvent.setup()
    render(
      <Tooltip
        data-testid={testId}
        content={'text'}
        tooltipContentProps={{
          'data-testid': tooltipContentTestId,
        }}
      />,
    )

    await user.hover(screen.getByTestId(testId))

    let tooltipContentParent = screen.getByTestId(tooltipContentTestId)
      .parentElement

    expect(tooltipContentParent).toHaveStyle({
      opacity: 1,
    })
  })
})
