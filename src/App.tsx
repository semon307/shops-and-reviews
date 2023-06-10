import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AppNotFound } from './components/app-not-found';
import { ReviewList } from './pages/reviews/review-list';
import { ShopList } from './pages/shops/shop-list';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={''} element={<Navigate to={'/shops'} replace/>}/>
        <Route path={'/shops/*'} element={<ShopList/>}/>
        <Route path={'/reviews/:tsId'} element={<ReviewList/>}/>
        <Route path={'*'} element={<AppNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
