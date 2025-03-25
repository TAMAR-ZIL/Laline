import { Route, Routes, useLocation, Router } from 'react-router-dom'
import './App.css'
import ProductList from './pages/ProductList'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import CheckOut from './pages/CheckOut.jsx'
import Cart from './pages/Cart'
import { useEffect, useState, useMemo } from 'react'
import { Provider, useDispatch, useSelector } from "react-redux"
import { addToCart } from './features/cartSlice'
import { store } from './app/store.js'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct.jsx'
import LogOut from './components/LogOut.jsx'
import Orders from './pages/Orders.jsx'
import Profile from './components/Profile.jsx'
import OneProduct from './pages/OneProduct.jsx'
import Home from './pages/Home.jsx'
import { logIn } from './features/userSlice.js'
import AllOrders from './pages/AllOrders.jsx'
import AllUsers from './components/AllUsers.jsx'
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Rate from './components/Rate.jsx'
import ContactForm from './pages/ContactForm.jsx'
import Root from './pages/Root.jsx'
import { useNavigate } from 'react-router-dom'
// import Footer from './components/Footer.jsx'


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const [showImage, setShowImage] = useState(true);
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/show-image") {
      setShowImage(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedCart) {
      savedCart.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
    if (savedUser) {
      dispatch(logIn(savedUser));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`theme-toggle-btn ${darkMode ? "dark" : "light"}`}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <Container>
          <NavBar />
          <Routes>
            <Route path='contact' element={<ContactForm />} />
            <Route path='/rate' element={<Rate />} />
            <Route path='/root' element={<Root />} />
            <Route path='/products' element={<ProductList />} >
              <Route path="products/:id" element={<OneProduct />} />
            </Route>
            {!user && (<Route path='/SignUp' element={<SignUp />} />)}
            {!user && (<Route path='/logIn' element={<LogIn />} />)}
            <Route path='checkOut' element={<CheckOut />} />
            {user && user.role === 'ADMIN' && (<Route path='/AddProduct' element={<AddProduct />} />)}
            {user && user.role === 'ADMIN' && (<Route path='/products/:id' element={<UpdateProduct />} />)}
            {user && user.role === 'ADMIN' && (<Route path='AllOrders' element={<AllOrders />} />)}
            {user && user.role === 'ADMIN' && (<Route path='/AllUsers' element={<AllUsers />} />)}
            {user && (<Route path='LogOut' element={<LogOut />} />)}
            {user && (<Route path='Profile' element={<Profile />} />)}
            {user && (<Route path='/Orders' element={<Orders />} />)}
            <Route path='cart' element={<Cart />} />
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <Footer/>  */}
        </Container>

      </ThemeProvider>

    </Provider>

  );

}

export default App
