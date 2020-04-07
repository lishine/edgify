import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('React Testing Library works!', () => {
  const { getByRole } = render(<App />)
  expect(getByRole('searchbox')).toBeInTheDocument()
})
