// src/components/MainLayout.js
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet /> {/* This will render the child routes */}
    </main>
  </div>
);

export default MainLayout;
