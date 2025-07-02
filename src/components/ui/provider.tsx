'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { ColorModeProvider, ColorModeProviderProps } from './color-mode'
import { Fira_Sans as BodyFont } from 'next/font/google'

// *** Fonts ***
export const bodyFont = BodyFont({
  variable: '--font-body',
  weight: ['400'],
  subsets: ['latin'],
})

export const system = createSystem(defaultConfig, {
  globalCss: {
    'html , body': {
      lineHeight: '1.2',
      scrollBehavior: 'smooth',
    },
    '::-webkit-scrollbar': {
      width: '10px',
      zIndex: '1',
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      bg: 'var(--chakra-colors-brand-bg)',
    },
    /* Handle */
    '::-webkit-scrollbar-thumb': {
      bg: 'var(--chakra-colors-brand-emphasized)',
      borderRadius: '10px',
    },
    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'var(--chakra-colors-brand-secondary)',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: bodyFont.style.fontFamily },
        body: { value: bodyFont.style.fontFamily },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          default: {
            value: { _light: '#0f172a', _dark: '#E1E7EF' },
          },
          secondary: {
            value: { _light: '#7f8EA3', _dark: '#7f8EA3' },
          },
          subtel: {
            value: { _light: 'colors.gray.800', _dark: 'colors.gray.200' },
          },
          muted: {
            value: { _light: 'colors.gray.50', _dark: 'colors.gray.950' },
          },
          emphasized: {
            value: { _light: 'colors.gray.300', _dark: 'colors.gray.700' },
          },
          bg: {
            value: { _light: 'white', _dark: 'colors.bg' },
          },
        },
      },
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
