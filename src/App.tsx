import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SecondaryNav } from './components/SecondaryNav';
import { Footer } from './components/Footer';
export function App() {
  const [selectedOption, setSelectedOption] = useState('Kubernetes');
  const navigate = useNavigate();
  const location = useLocation();
  return <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <SecondaryNav selectedOption={selectedOption} navigate={navigate} />
      <Outlet />
      <Footer />
    </div>;
}