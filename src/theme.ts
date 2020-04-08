import { theme as defaultTheme } from '@chakra-ui/core'

// console.log(JSON.stringify(defaultTheme, 0, 2))

export const theme = {
  ...defaultTheme,
  radii: { ...defaultTheme.radii, xl: '1rem', xxl: '2rem' },
}
