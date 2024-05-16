import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerList from './CustomerDetails';
import CustomerForm from './CustomerForm';
import Home from './Home';
import NotFound from './NotFound';


function App() {

  return (
    <div className="app-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/customers' element={<CustomerList /> } /> 
            <Route path='/add-customer' element={<CustomerForm />} />
            <Route path='/edit-customers/:id' element={<CustomerForm />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
  )
}


export default App