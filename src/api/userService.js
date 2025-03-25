import axios from "axios";
let baseUrl = "https://shopping-kuuk.onrender.com/api/user";
export const addUser = async (userData) => {
    try {
      const res = await axios.post(`${baseUrl}/signUp`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return res;
    } catch (error) {
      throw error;
    }
};
export const getAllUsers = async(token)=>{
    try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data; 
      } 
    catch (error) {
       throw error;
    }
}
  

export const login = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/login`, {
            userName: data.userName,
            password: data.password,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        localStorage.setItem('token', res.data.token);
        return res;
    }
    catch (error) {
        throw error;
    }
};





