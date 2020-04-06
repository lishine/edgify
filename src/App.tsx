import * as React from 'react'
import './styles.css'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <input />
      </div>
    </ThemeProvider>
  )
}
