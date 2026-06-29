import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {ClerkProvider} from '@clerk/react';
import './index.css'
createRoot(document.getElementById('root')).render(

 <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
 navigate={(to) => navigate(to)} 
 >
  {" "}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
 </ClerkProvider>,

)
