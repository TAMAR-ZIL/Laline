import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct, getCategories } from "../api/products";
import Swal from "sweetalert2";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import "../styles/updateProduct.css"

const UpdateProduct = () => {
    const token = localStorage.getItem("token");
    // const expirationTime = localStorage.getItem('tokenExpiration');
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({});
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePath = `/images/${file.name}`;
            setImagePreview(imagePath);
        }
    };
    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res.data);
            })
    }, []);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (token) {
                    const data = await getProductById(id);
                    setProductData(data);
                    setValue("nameProduct", data.nameProduct);
                    setValue("color", data.color);
                    setValue("price", data.price);
                    setValue("stock", data.stock);
                    setValue("category", data.category);
                    setImagePreview(data.description);
                }
                else {
                    Swal.fire({
                        title: 'Session Expired',
                        text: 'Your session has expired. Please log in again.',
                        icon: 'warning',
                        confirmButtonText: 'Log In'
                    }).then(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('tokenExpiration');
                        window.location.href = '/login';
                    });
                }

            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // const onSubmit = async (data) => {
    //     const updatedProduct = {
    //         ...data,
    //         description: imagePreview ? imagePreview : productData.description,
    //     };
    //     try {
    //         if (token ) {
    //             await updateProduct(id, updatedProduct);
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: "Product updated successfully!",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //             navigate("/products");
    //         }
    //         else {
    //             Swal.fire({
    //                 title: 'Session Expired',
    //                 text: 'Your session has expired. Please log in again.',
    //                 icon: 'warning',
    //                 confirmButtonText: 'Log In'
    //             }).then(() => {
    //                 localStorage.removeItem('token');
    //                 // localStorage.removeItem('tokenExpiration');
    //                 window.location.href = '/login';
    //             });
    //         }
    //     } catch (err) {
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "error",
    //             title: "Error updating product",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    // };
    const onSubmit = async (data) => {
        const updatedProduct = {
            ...data,
            description: imagePreview || productData.description, // שולח את הנתיב בלבד
        };

        try {
            await updateProduct(id, updatedProduct);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/products");
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error updating product",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <>

            {imagePreview && (
                <div className="image-preview-container">
                    <h4>Image Preview</h4>
                    <img src={imagePreview} alt="preview" width="200" />
                </div>
            )}
            <div className="update-product-container">
                <h2>Update Product</h2>

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
                    <button type="submit">update Product</button>
                </form>
            </div>
        </>
    );
};
export default UpdateProduct;
