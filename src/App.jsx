// import { useState, useEffect } from 'react';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalState, useGlobalState } from './services/GlobalState';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import HomePage from './pages/HomePage'; 
import SinglePost from './pages/SinglePost';
import Contact from './pages/Contact'; 
import axios from 'axios'; 
import './App.css';

// It was not allowed to use location in the main app component, for that I create this help component and I convert the App component to a placeholder of this component. 
const AppHelpComponent = () => {

  const globalState = useGlobalState();

  // Checks the current path. This configuration made so that if the user checks just posts by specific id, never to retrieve the global posts list. 
  return (
    <GlobalState.Provider value={globalState}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer posts={globalState.posts} />
      </div>
    </GlobalState.Provider>
  );
};

const App = () => {
  return (
    <Router>
      <AppHelpComponent />
    </Router>
  );
};

export default App


