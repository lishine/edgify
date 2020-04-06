/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconProps,
  InputProps,
} from '@chakra-ui/core'
import theme from './theme'
import { Global } from '@emotion/core'

const IIcon = (props: IconProps) => <Icon {...props} size="10px" />
const IInput = (props: InputProps) => (
  <InputGroup>
    <InputLeftElement children={<IIcon name="search" />} />
    <Input
      placeholder="image search"
      {...{ borderRadius: '20px' }}
      {...props}
    />
    <InputRightElement children={<IIcon name="close" />} />
  </InputGroup>
)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={{ body: { backgroundColor: 'green' } }} />
      <Box {...{ m: 10, width: '300px' }}>
        <IInput />
      </Box>
    </ThemeProvider>
  )
}
