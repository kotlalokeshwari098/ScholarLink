import React from 'react'
import { BrowserRouter,createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HomePage from  './pages/HomePage';
import ScholarShipList from './pages/ScholarShipList'
// import ScholarLayout from './layouts/ScholarLayout';
import ScholarShipInfo from './pages/ScholarShipInfo'
import ScholarShipCompatibility from './pages/ScholarShipCompatablility'
import AboutUs from './pages/AboutUs';
import BookMark from './pages/BookMark'
import Sign from './pages/Sign';

const routes=createBrowserRouter(createRoutesFromElements(
    
     <Route path='/' element={<AppLayout />}>
         <Route index element={<HomePage />}/>
         <Route path='/scholarshiplist' element={<ScholarShipList />}/>
         <Route path='/scholarshiplist/:name' element={<ScholarShipInfo />}/>   
         <Route path='/scholarshiplist/:id/:name' element={<ScholarShipCompatibility />}/>    
         <Route path='/about' element={<AboutUs />}/> 
         <Route path='/bookmark' element={<BookMark />}/>   
         <Route path='/sign' element={<Sign />}/>   

     </Route>
   
))
function App() {
  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App
