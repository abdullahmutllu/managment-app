'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  )
}