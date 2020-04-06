/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from '@chakra-ui/core'
import chackraTheme from './chackraTheme'
import { Global } from '@emotion/core'

// import theme from './theme'

// declare module 'react' {
//   // tslint:disable-next-line: no-empty-interface
//   interface DOMAttributes<T> extends SxProps {}
// }

// declare global {
//   namespace JSX {
//     // tslint:disable-next-line: no-empty-interface
//     interface IntrinsicAttributes extends SxProps {}
//   }
// }
export default function App() {
  return (
    <ThemeProvider theme={chackraTheme}>
      <CSSReset />
      <div sx={{ m: 10, width: '300px' }}>
        <Global styles={{ body: { backgroundColor: 'green' } }} />
        <Input
          placeholder="Basic usage"
          size="md"
          sx={{ m: 10, width: '200px' }}
        />
        <InputGroup>
          <InputLeftElement
            color="gray.300"
            fontSize="1.2em"
            children={<Icon name="search" color="green.500" />}
          />
          <Input placeholder="image search" />
          <InputRightElement
            children={<Icon name="close" color="green.500" />}
          />
        </InputGroup>
        <InputGroup sx={{ mt: 5 }}>
          <InputLeftElement
            color="gray.300"
            fontSize="1.2em"
            children={<Icon name="search" color="green.500" />}
          />
          <Input placeholder="image search" sx={{ borderRadius: '20px' }} />
          <InputRightElement
            children={<Icon name="close" color="green.500" />}
          />
        </InputGroup>
      </div>
    </ThemeProvider>
  )
}
