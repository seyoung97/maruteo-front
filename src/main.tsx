import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from "jotai"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { GlobalStyles } from './theme/GlobalStyles.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Provider>
          <GlobalStyles/>
          <App />
        </Provider>
      </JotaiProvider>
    </QueryClientProvider>
  </StrictMode>,
)
