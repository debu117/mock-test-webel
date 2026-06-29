import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import MyResultPage from './pages/MyResultPage';
const App = () => {
  const { isLoaded} = useAuth();
  if( !isLoaded) return null;
  return (
   <Routes>
      <Route path='/' element={<Home />} >
      </Route>
      
      <Route path='/result' element={
        <>
        <SignedIn when = 'signed-in'>
          <MyResultPage />
        </SignedIn>
        <SignedOut when = 'signed-out'>
          <Navigate to="/"  ></Navigate>
        </SignedOut>
        </>
      }
      />

   </Routes>
  )
}

export default App