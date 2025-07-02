import { Container, ContainerProps } from '@chakra-ui/react'

export const MyContainer = ({ children, ...props }: ContainerProps) => {
  return (
    <Container px={{ base: 2, md: 4 }} maxW={'5xl'} mx={'auto'} {...props}>
      {children}
    </Container>
  )
}
