import * as React from "react";
import { useEffect, useState } from "react";
import { GetAllProducts, GetTotalProductsPages, getCategories, deleteProduct } from "../api/products.js";
import { Outlet, useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";
import useCart from "../hooks/useCart.js";
import '../styles/List.css';
import { Pagination } from "@mui/material";
import { MenuItem } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import OneProduct from "./OneProduct.jsx";
import '../styles/OneProduct.css'
import Search from "../components/Search.jsx";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from "sweetalert2";

const ProductList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  let [isPending, start] = React.useTransition();
  const OpenProduct = (productId) => () => {
    setOpen(productId);
  };

  const CloseProduct = () => {
    setOpen(null);
  };

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
  }, []);

  useEffect(() => {
    if (showCart) {
      const timer = setTimeout(() => {
        setShowCart(false);
      }, 10000);
    }
  }, [showCart]);

  useEffect(() => {
    start(() => {
      setLoading(true);
      GetTotalProductsPages(category, search)
        .then((res) => {
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.error(err));
      GetAllProducts(currentPage, category, search)
        .then((res) => {
          setDisplayedProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    })
  }, [category, search, currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-list-container">
      <h1>Our products</h1>
      <Drawer
        anchor="right"
        open={showCart}
        onClose={() => setShowCart(false)}
        sx={{
          width: '300px',
          flexShrink: 0,
        }}
      >
        <Cart onClose={() => setShowCart(false)} />
      </Drawer>


      {loading ? (
        <div className="loading-screen">
          <img className="loader" src="public\images\Laline.svg.png" alt="Logo" />
        </div>
      ) : (
        <>
          <Outlet />
          <Search search={search} setSearch={setSearch} showSearch={showSearch} setShowSearch={setShowSearch} />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="ALL">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>

          <div className="product-grid">
            {displayedProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="img-cont">
                  <img
                    className="product-image"
                    src={product.description}
                    alt={product.nameProduct}
                    onClick={OpenProduct(product._id)}
                  />
                </div>
                <h2 className="product-name">{product.nameProduct}</h2>
                <h2 className="product-price">{product.price}</h2>
                <Drawer open={open === product._id} onClose={CloseProduct}>
                  <OneProduct id={product._id} />
                </Drawer>
                <div className="cart-actions">
                  <AddIcon onClick={() => { addToCart(product); setShowCart(true); }}></AddIcon>
                  <span className="product-quantity">
                    {cart.find((item) => item._id === product._id)?.qty || 0}
                  </span>
                  <RemoveIcon onClick={() => removeFromCart(product._id)}></RemoveIcon>
                </div>
                {user && user.role === 'ADMIN' && (<EditIcon className="update-product" onClick={() => navigate(`/products/${product._id}`)}>updateProduct</EditIcon>)}
                {user && user.role === 'ADMIN' && (<DeleteForeverIcon
                  onClick={async () => {
                    try {
                      await deleteProduct(product._id);
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>',
                      });
                    }
                  }}>deleteProduct </DeleteForeverIcon>)}
              </div>
            ))}
          </div>
          <div className="pagination">
            <Pagination className="paging"
              count={totalPages}
              size="large"
              page={currentPage}
              onChange={(e, v) => changePage(v)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
