import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorize from './Pages/Authorize';
import PanelMenu from './Pages/PanelMenu';
import CategoryMenu from './Pages/CategoryMenu';
import OrderMenu from './Pages/OrderMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorize />} />
        <Route path='/panelMenu' element={<PanelMenu />} />
        <Route path='/categoriesMenu' element={<CategoryMenu />} />
        <Route path='/ordersMenu' element={<OrderMenu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
