import Navbar from '@/components/navbar'
// import SizeIndicator from '@/components/SizeIndicator'
import { MyContainer } from '@/components/ui/container'
import { Provider } from '@/components/ui/provider'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Navbar />
      <MyContainer>
        <Component {...pageProps} />
      </MyContainer>
      {/* <SizeIndicator /> */}
    </Provider>
  )
}
