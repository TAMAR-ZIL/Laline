import axios from "axios";
let baseUrl = "https://shopping-kuuk.onrender.com/api/product";

export function GetAllProducts(page, category, search) {
    return axios.get(`${baseUrl}?page=${page}&category=${category}&search=${search}`);
}
export function GetTotalProductsPages(category, search) {
    return axios.get(`${baseUrl}/totalPages?category=${category}&search=${search}`);
}
export const getCategories = () => {
    return axios.get(`${baseUrl}/getCategories`)
}
export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${baseUrl}`, productData, {
            headers: {
                "Content-Type": "application/json", // שליחת JSON
                "Authorization": `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error("Error adding product");
    }
};
export const getProductById = async (productId) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(`${baseUrl}/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw new Error("Error fetching product");
    }
};
export const uploadImage = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post(`${baseUrl}/upload`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.description; 
    } catch (error) {
        throw new Error("Error uploading image");
    }
};

export const updateProduct = async (productId, productData) => {
    const token = localStorage.getItem("token");
    console.log("Updated Product Data:", productData);
    try {
        return axios.put(`${baseUrl}/${productId}`, productData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error("Error updating product");
    }
};
export const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.delete(`${baseUrl}/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return res.data;
    }
    catch {
        throw new Error("Error updating product");
    }
}

