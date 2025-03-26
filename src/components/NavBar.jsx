import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import '../styles/Nav.css'
import Profile from '../components/Profile'
import { useSelector, useDispatch } from 'react-redux';
import CostomizedBadges from '../components/CostomizedBadges'

const NavBar = ({ onShowImage }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <AppBar position="static" className='container'>
      <Container maxWidth="xl" className='appBar'>
        <Toolbar disableGutters>
          <Link to="/" onClick={onShowImage}><img className='laline-font' src='public\lalineLogo.svg' /></Link>
          {user && <Profile />}
          <div className='all-links'>
            {user ? (
              <>
                <Link className='link' to='/LogOut'>Log Out</Link>
                <Link className='link' to='/Orders'>Your Orders</Link>
                {user.role === 'ADMIN' && (
                  <>
                    <Link className='link' to='/AllUsers'>All users</Link>
                    <Link className='link' to='/AddProduct'>Add Product</Link>
                    <Link className='link' to='AllOrders'>All Orders</Link>
                  </>
                )}

              </>
            ) : (
              <>
                <Link className='link' to='/LogIn'>Login</Link>
                <Link className='link' to='/SignUp'>Sign Up</Link>
              </>
            )}
            <Link className='link' to='/contact'>Contact us</Link>
            <Link className='link' to='/products'>Products</Link>
            <Link className='link' to='/root'>About us</Link>
            <CostomizedBadges />

          </div>

        </Toolbar>
      </Container>

    </AppBar>
  );
}

export default NavBar;
