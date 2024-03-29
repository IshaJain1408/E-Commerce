// src/App.js
import React from 'react';
import { BrowserRouter,  Link,  Route, Routes } from 'react-router-dom'; // Change here
import { useContext } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import {LinkContainer} from 'react-router-bootstrap'
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';




function App() {
  const { state } = useContext(Store);
  const {cart}=state;

  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
    <header>
    <Navbar bg='dark' varienrt='dark'>
      <Container>
      <LinkContainer to="/">
      <Navbar.Brand>amazona</Navbar.Brand>
      </LinkContainer>
       <Nav className='me-auto'>
        <Link to='/cart' className='nav-link'>
        Cart
          {cart.cartItems.length >0 &&(
            <Badge pill bg='danger'>
            {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}

            </Badge>
          )}
        </Link>
       </Nav>
      </Container>
    </Navbar>
      {/* <Link to='/'>amazona</Link> */}
    </header>
    <main>
   <Container className='mt-3'>
    <Routes> 
    <Route path="/product/:slug" element={<ProductScreen />} />
    <Route path="/cart" element={<CartScreen />} />
    <Route path="/signin" element={<SigninScreen />} />

        <Route path="/" element={<HomeScreen />} />
    
      </Routes> 
      </Container> 
      </main>
      <footer>
        <div className='text-center '>
          All rights reserved
        </div>
      </footer>
    </div>
    </BrowserRouter>

  );
}

export default App;
