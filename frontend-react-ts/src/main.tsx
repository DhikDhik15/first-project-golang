import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router';

//import QueryClient dan QueryClientProvider dari react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//init QueryClient
const queryClient = new QueryClient()

//import AuthProvider
import { AuthProvider } from '../context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
