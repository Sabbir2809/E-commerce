import React from 'react';
import Navbar from '../features/NavBar/Navbar';
import { ProductList } from '../features/product-list/components/ProductList';

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
};

export default Home;
