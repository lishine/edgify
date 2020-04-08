import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

test('New search', async () => {
  const { getByRole, getByDisplayValue, findByText, findAllByRole } = render(
    <App />
  )
  const input = getByRole('searchbox')
  fireEvent.change(input, { target: { value: 'tomato' } })
  getByDisplayValue('tomato')
  await findByText('tomato')
  expect((await findAllByRole('img')).length).toBeGreaterThan(10)
})
