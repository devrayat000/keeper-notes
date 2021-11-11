import type { AppProps, AppPropsX } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@emotion/cache'
import { lightTheme } from '../utils/theme'

const clientSideEmotionCache = createEmotionCache({ key: 'css' })

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsX) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />;
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp

declare module 'next/app' {
  interface AppPropsX extends AppProps {
    emotionCache: EmotionCache
  }
}
