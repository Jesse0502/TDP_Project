// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './index.css';

import App from './App.tsx';
import NewsSingle from './layout/NewsSingle.tsx';

const Main = () => {
  const [newsData, setNewsData] = useState<unknown>(null);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <App
                passInTop={(item): void => {
                  setNewsData(item); // Store the data in state
                }}
              />
            }
          />
          <Route
            path="/:title"
            element={<NewsSingle newsData={newsData} />}
          />
        </Routes>
      </Router>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<Main />);
