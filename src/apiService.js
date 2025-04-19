import axios from "axios";

const BASE_URL = "https://crm-backend-api-nine.vercel.app/api";
//const BASE_URL = "http://localhost:3003/api";

const apiService = {
  // Product APIs
  createProduct: (data) => axios.post(`${BASE_URL}/products`, data),
  getProducts: () => axios.get(`${BASE_URL}/products`),
  updateProduct: (id, data) => axios.put(`${BASE_URL}/products/${id}`, data),
  deleteProduct: (id) => axios.delete(`${BASE_URL}/products/${id}`),

  // User APIs
  createUser: (data) => axios.post(`${BASE_URL}/users`, data),
  getUsers: () => axios.get(`${BASE_URL}/users`),
  updateUser: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
  deleteUser: (id) => axios.delete(`${BASE_URL}/users/${id}`),
};

export default apiService;
