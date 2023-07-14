import React from 'react'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';

const Layout = ({ items}) => {
    
    return (
    <div className='App'>
        <Header title="Grocery List" />
      <Nav />
      <Outlet />
      <Footer length={items.length} />
    </div>
  )
}

export default Layout