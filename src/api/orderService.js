import axios from "axios";

let baseUrl="https://shopping-kuuk.onrender.com/api/order";
export const getEmail = async (email, Username, orderId, items, total) => {
  
  try {
    const orderDetails = {
      email,
      Username,
      orderId,
      items, 
      total
    };
    const response = await axios.post(`${baseUrl}/getEmail`, orderDetails,
      {headers: { 'Content-Type': 'application/json' }});
  } catch (error) {
    throw new Error('Error sending email:', error);
  }
};
export const getAllOrders = async (token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const addOrder = async (orderData, token) => {
  try {
    const response = await axios.post(baseUrl, orderData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error: ${error.response.data.message || 'Unknown error'}`);
    }
    throw new Error(`Network error: ${error.message}`);
  }
};
export const deleteOrderById = async (orderId, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateOrder = async (orderId, updateData, token) => {
  try {
    const response = await axios.put(`${baseUrl}/${orderId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrdersByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};
