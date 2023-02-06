import '../styles/globals.css'
import { Roboto } from '@next/font/google';
import Script from 'next/script';


const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='de'>
     
      <body className='font-sans bg-white h-screen flex flex-col bg-gradient-to-r to-[#1c2733] from-[#11161c]'>
        
          {children}
        
      </body>
    </html>
  )
}
export const revalidate = 0


/*
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BT85FBKXWB"></script>
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
          dataLayer.push(arguments);
        }
          gtag('js', new Date());
  
          gtag('config', 'G-BT85FBKXWB');

        `}
      </Script>


      */