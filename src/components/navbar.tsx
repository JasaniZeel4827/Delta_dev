'use client'
import { ColorModeButton, useColorMode } from '@/components/ui/color-mode'
import { siteConfig } from '@/libs/configs/site.config'
import { Box, Button, Flex, HStack, Link, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { IoBriefcaseOutline, IoHomeOutline, IoMailOpenOutline, IoMenu } from 'react-icons/io5'
import { PiProjectorScreen } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'
import { Avatar } from './ui/avatar'
import { MyContainer } from './ui/container'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toggleColorMode } = useColorMode()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }
  return (
    <MyContainer zIndex={1} position={'sticky'} top={3}>
      <Box mb={10} borderWidth="1px" borderColor="gray.subtel" borderRadius="md" bg="bg">
        <Flex
          justifyContent={{
            base: 'space-between',
            md: 'space-between',
          }}
          py={3}
          px={6}
        >
          <HStack gap={4} px={{ base: 3, md: 0 }}>
            <Avatar size={'sm'} name={siteConfig.profile.name} src={siteConfig.profile.avatar} />
            <Button
              variant={'outline'}
              padding={2}
              _hover={{ bg: 'brand.muted' }}
              borderColor={'gray.subtel'}
              hideBelow={'md'}
            >
              <Link
                fontWeight={'bold'}
                href={siteConfig.social.twitterHref}
                _focus={{ outline: 'none', boxShadow: 'none' }}
                _hover={{ textDecoration: 'none' }}
              >
                @{siteConfig.social.twitterHandle}
              </Link>
            </Button>
          </HStack>
          <Button
            variant={'outline'}
            padding={2}
            _hover={{ bg: 'brand.muted' }}
            borderColor={'gray.subtel'}
            hideFrom={'md'}
          >
            <Link
              fontWeight={'bold'}
              href={siteConfig.social.twitterHref}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              _hover={{ textDecoration: 'none' }}
            >
              @{siteConfig.social.twitterHandle}
            </Link>
          </Button>
          <HStack gap={4} hideBelow={'md'}>
            {navitems.map((nav, index) => {
              return (
                <Link
                  key={index}
                  href={nav.href}
                  border={0}
                  p={2}
                  borderRadius={'md'}
                  _hover={{ bg: 'brand.muted', textDecoration: 'none' }}
                >
                  {nav.icon}
                  {nav.label}
                </Link>
              )
            })}
            <ColorModeButton onClick={toggleColorMode} />
          </HStack>
          <Button
            p={2}
            hideFrom={'md'}
            variant={'outline'}
            padding={2}
            _hover={{ bg: 'brand.muted' }}
            color={'brand'}
            border={0}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <RxCross2 /> : <IoMenu />}
          </Button>
        </Flex>
        {isMenuOpen && (
          <Box hideFrom={'md'} p={2}>
            <Stack gap={4}>
              {navitems.map((nav, index) => {
                return (
                  <Link
                    key={index}
                    href={nav.href}
                    border={0}
                    color="brand"
                    p={2}
                    _hover={{ bg: 'brand.muted', textDecoration: 'none' }}
                  >
                    {nav.icon}
                    {nav.label}
                  </Link>
                )
              })}
              <ColorModeButton
                borderWidth={'1px'}
                borderRadius={'md'}
                borderColor={'border'}
                _hover={{ bg: 'brand.muted' }}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </MyContainer>
  )
}
type NavLink = {
  label: string
  icon: React.ReactNode
  href: string
}
const navitems: NavLink[] = [
  {
    label: 'Home',
    icon: <IoHomeOutline />,
    href: '#about',
  },
  {
    label: 'Projects',
    icon: <PiProjectorScreen />,
    href: '#projects',
  },
  {
    label: 'Work',
    icon: <IoBriefcaseOutline />,
    href: '#work',
  },
  {
    label: 'Contact',
    icon: <IoMailOpenOutline />,
    href: '#contact',
  },
]
