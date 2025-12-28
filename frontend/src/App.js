



import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { createContext, useState, useEffect } from 'react';

export const filterDataContext = createContext({});

function App() {
  const [filterData,setFilterData] = useState([])
  return (
    <filterDataContext.Provider value={{filterData,setFilterData}}>
      <Header />
      <main className='min-h-[calc(100vh-120px)] bg-slate-100'>
        <Outlet />
      </main>
      <Footer />
    </filterDataContext.Provider>
  );
}

export default App;
