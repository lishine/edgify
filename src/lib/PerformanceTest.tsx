import React, { useState } from 'react'
import { Heading, useToast, Button, Flex, Box, Stack, SimpleGrid } from '@chakra-ui/core'

import { createContext } from './contextStoreD'

const N = 5000
const createRange = (r: number) => [...Array(r).keys()]
const createAr = (r: number) => createRange(r).map((i) => i * 10)

const usePerformanceState = () => {
  const [ar, setAr] = useState(createAr(N))
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

  console.log('rendering Provider')
  return {
    ar,
    forceUpdate,
  }
}

const { Provider, useContext: usePerformancerContext } = createContext(usePerformanceState)

const ForceUpdateRootMemoComp: React.FC<{ i: number }> = React.memo((p) => {
  return <div>{p.i}</div>
})
const ForceUpdateRootMemo = () => {
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

  return (
    <Stack align='center'>
      <Button mb={2} onClick={forceUpdate}>
        Force update memo root
      </Button>
      {createRange(N).map((i: number) => (
        <ForceUpdateRootMemoComp key={i} i={i} />
      ))}
    </Stack>
  )
}

const ForceUpdateRootComp: React.FC<{ i: number }> = (p) => {
  return <div>{p.i}</div>
}
const ForceUpdateRoot = () => {
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

  return (
    <Stack align='center'>
      <Button mb={2} onClick={forceUpdate}>
        Force update root
      </Button>
      {createRange(N).map((i: number) => (
        <ForceUpdateRootComp key={i} i={i} />
      ))}
    </Stack>
  )
}

const ForceUpdateContextComp: React.FC<{ i: number }> = (p) => {
  const n = usePerformancerContext((state) => state.ar[p.i])

  console.log('rendering', p.i)
  return <div>{n}</div>
}
const ForceUpdateContext = () => {
  const forceUpdate = usePerformancerContext((state) => state.forceUpdate)

  return (
    <Stack align='center'>
      <Button mb={2} onClick={forceUpdate}>
        Force update context
      </Button>
      {createRange(N).map((i: number) => (
        <ForceUpdateContextComp key={i} i={i} />
      ))}
    </Stack>
  )
}

export const PerformanceTest = () => {
  const [isOpen, setOpen] = React.useState(false)
  const toast = useToast()

  console.log('rendering perf')
  return (
    <>
      <Button
        onClick={() => {
          toast({
            title: 'Opening performance test',
            status: 'info',
            duration: 8000,
            isClosable: true,
            position: 'top-left',
          })
          setTimeout(() => setOpen(true), 500)
        }}
      >
        Open Performance test
      </Button>
      {isOpen && (
        <Flex {...{ flexDirection: 'column', alignItems: 'center' }}>
          <Heading>Performance test</Heading>
          <Button mt={2} m={4} onClick={() => setOpen(false)}>
            CLOSE
          </Button>
          <Provider>
            <SimpleGrid columns={3} spacing={2}>
              <ForceUpdateRoot />
              <ForceUpdateRootMemo />
              <ForceUpdateContext />
            </SimpleGrid>
          </Provider>
        </Flex>
      )}
    </>
  )
}
