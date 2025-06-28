import { GoogleOAuthProvider } from '@react-oauth/google'
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
      <GoogleOAuthProvider clientId={"344195573568-i0t9bqegg6cclf8gqc1q8s3j9ro9tqd3.apps.googleusercontent.com"}>
      <JotaiProvider>
        <Provider>
          <GlobalStyles/>
          <App />
          {/* <GoogleLogin onSuccess={()=>{
            console.log('success')
          }} onError={()=>{
            console.log('error')
          }}/> */}
        </Provider>
      </JotaiProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
