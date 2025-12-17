import React from 'react'
import Header from '../../widgets/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../../widgets/Footer/Footer';
import "./Layout.css";


export default function Layout({user, setUser}) {
return (
  <div className="app">
    <Header user={user} setUser={setUser} />
    <main className="main">
      <Outlet />
    </main>
    {/* <Footer /> */}
  </div>
);
}
