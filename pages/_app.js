import '@/styles/globals.css'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'


import {Navbar,Footer} from '../components'

export default function App({ Component, pageProps }) {
  return  (
  <ThemeProvider attribute='class'>
    <div className='dark:bg-nft-dark bg-white min-h-screen'>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
  </div>
  <Script src='https://kit.fontawesome.com/8a40a6fca5.js' crossOrigin='anonymous'/>
  </ThemeProvider>  
  )
}
