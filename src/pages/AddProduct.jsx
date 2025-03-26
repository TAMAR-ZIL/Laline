import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct, getCategories } from "../api/products";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import "../styles/AddProduct.css"

const AddProduct = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);  // לתצוגת התמונה
  const [productData, setProductData] = useState({});
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("Home");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
  }, []);
  const onSubmit = async (data) => {
    try {
      const productData = {
        nameProduct: data.nameProduct,
        description: imagePreview, // שמירת שם הקובץ
        color: data.color,
        creationDate: new Date(),
        productor: {
          name: currentUser ? currentUser.name : "Unknown",
          email: currentUser ? currentUser.email : "Unknown",
        },
        price: data.price || 50,
        stock: data.stock || 200,
        category: data.category || "Home",
      };
      console.log(productData);

      await addProduct(productData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/products");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding product",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <>
      {imagePreview && (
        <div className="image-preview-container">

          <img className="img-preview" src={imagePreview} alt="preview" width="200" />
        </div>
      )}
      <h2>Add New Product</h2>
      <div className="add-product-container">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <label className="lbl" htmlFor="name">Name Product</label>
            <input className="npt" id="name" type="text"{...register("nameProduct", { required: "Product name is required", minLength: { value: 2, message: "Product name must be at least 2 characters" } })} />
            {errors.nameProduct && <p>{errors.nameProduct.message}</p>}
          </div>
          <div>
            <label className="lbl" htmlFor="color">Color</label>
            <input className="npt" id="color" type="color"{...register("color", { required: "Product color is required" })} />
            {errors.color && <p>{errors.color.message}</p>}
          </div>
          <div>
            <label className="lbl" htmlFor="price">Price</label>
            <input className="npt" id="price" type="number"{...register("price", { valueAsNumber: true })} />
          </div>
          <div>
            <label className="lbl" htmlFor="stock" >Stock</label>
            <input className="npt" id="stock" type="number"{...register("stock", { valueAsNumber: true })} />
          </div>
          <div>
            <label className="lbl" htmlFor="category">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="lbl">Product Image</label>
            <input className="npt" type="file" accept="image/*" onChange={handleImageChange} />

          </div>
          <button type="submit">add Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;

